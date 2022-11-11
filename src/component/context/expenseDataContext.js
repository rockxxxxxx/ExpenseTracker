import { createContext, useContext, useState } from "react";
import { LoginContext } from "./loginContext";
import { ToasterContext } from "./toasterContext";

const addExpenses = (getExpense, am, desc, type, id) => {
  return [
    ...getExpense,
    {
      id: id,
      amount: am,
      description: desc,
      type: type,
    },
  ];
};

let loadedData = [];
function pushData(data) {
  for (const key in data) {
    loadedData.push({
      id: key,
      amount: data[key].amount,
      description: data[key].description,
      type: data[key].type,
    });
  }
}

export const ExpenseDataContext = createContext({
  getExpense: [],
  setGetExpense: () => {},
  amount: "",
  setAmount: () => {},
  description: "",
  setDescription: () => {},
  type: "",
  setType: () => {},
  addExpense: () => {},
  onRefreshDataLoad: () => {},
  onDelete: () => {},
});

export const ExpenseDataProvider = ({ children }) => {
  const [getExpense, setGetExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Please Select");
  const { userEmail } = useContext(LoginContext);
  const { setIsToaster, setIsMessage } = useContext(ToasterContext);

  const addExpense = () => {
    const data = {
      amount,
      description,
      type,
    };
    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        setIsToaster(true);
        setIsMessage({
          message: "Your expense is successfully added",
          type: "success",
        });
        response.json().then((data) => {
          console.log(data.name);
          setGetExpense(
            addExpenses(getExpense, amount, description, type, data.name)
          );
        });
      } else {
        setIsToaster(true);
        setIsMessage({
          message: "Something went wrong! Please try again later",
          type: "danger",
        });
        console.log("something went wrong");
      }
    });
  };

  const onRefreshDataLoad = () => {
    loadedData = [];
    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        pushData(data);
        setGetExpense(loadedData);
      });
  };

  const onDelete = (id1) => {
    fetch(
      `https://expnse-tracker-default-rtdb.firebaseio.com/${userEmail
        .split(".")
        .join("")}/${id1}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        setIsToaster(true);
        setIsMessage({
          message: "Your expense has been successfully deleted",
          type: "success",
        });
        const updatedGetItems = getExpense.filter((item) => item.id !== id1);
        setGetExpense(updatedGetItems);
      } else {
        setIsToaster(true);
        setIsMessage({
          message: "Something went wrong! Please try again later",
          type: "danger",
        });
      }
    });
  };
  const value = {
    getExpense,
    setGetExpense,
    amount,
    setAmount,
    description,
    setDescription,
    type,
    setType,
    addExpense,
    onRefreshDataLoad,
    onDelete,
  };
  return (
    <ExpenseDataContext.Provider value={value}>
      {children}
    </ExpenseDataContext.Provider>
  );
};
