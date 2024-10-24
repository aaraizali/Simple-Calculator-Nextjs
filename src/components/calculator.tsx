"use client"; // Enables Client-Side rendering

import { useState, ChangeEvent, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion"; 

export default function Calculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleNum1Change = (e: ChangeEvent<HTMLInputElement>) => setNum1(e.target.value);
  const handleNum2Change = (e: ChangeEvent<HTMLInputElement>) => setNum2(e.target.value);

  const calculate = (operation: string) => {
    let res = 0;
    switch (operation) {
      case "add":
        res = parseFloat(num1) + parseFloat(num2);
        break;
      case "subtract":
        res = parseFloat(num1) - parseFloat(num2);
        break;
      case "multiply":
        res = parseFloat(num1) * parseFloat(num2);
        break;
      case "divide":
        res = parseFloat(num2) !== 0 ? parseFloat(num1) / parseFloat(num2) : NaN;
        break;
    }
    const resultString = `${num1} ${operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "*" : "/"} ${num2} = ${res}`;
    setResult(res.toString());
    setHistory([resultString, ...history]);
  };

  const clear = () => {
    setNum1("");
    setNum2("");
    setResult("");
    setHistory([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "a":
          calculate("add");
          break;
        case "s":
          calculate("subtract");
          break;
        case "m":
          calculate("multiply");
          break;
        case "d":
          calculate("divide");
          break;
        case "c":
          clear();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [num1, num2]);

  return (
    <motion.div
      className={`flex flex-col items-center justify-center h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl mb-6 mx-auto p-5">
        <motion.div
          className="flex items-center justify-between space-x-4"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Button className="flex items-center space-x-2 bg-indigo-600 text-white hover:bg-indigo-500 transition duration-300" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <>
                <SunIcon className="w-5 h-5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                <span>Dark Mode</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className={`w-full max-w-md p-6 shadow-lg rounded-lg border transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <CardHeader>
          <CardTitle className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Simple Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="num1" className={isDarkMode ? "text-white" : "text-gray-800"}>Number 1</Label>
            <Input
              id="num1"
              type="number"
              value={num1}
              onChange={handleNum1Change}
              placeholder="Enter a number"
              className={`w-full p-2 rounded ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="num2" className={isDarkMode ? "text-white" : "text-gray-800"}>Number 2</Label>
            <Input
              id="num2"
              type="number"
              value={num2}
              onChange={handleNum2Change}
              placeholder="Enter a number"
              className={`w-full p-2 rounded ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button className={isDarkMode ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"} onClick={() => calculate("add")}>+</Button>
            <Button className={isDarkMode ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"} onClick={() => calculate("subtract")}>-</Button>
            <Button className={isDarkMode ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"} onClick={() => calculate("multiply")}>*</Button>
            <Button className={isDarkMode ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"} onClick={() => calculate("divide")}>/</Button>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="result" className={isDarkMode ? "text-white" : "text-gray-800"}>Result</Label>
            <Input
              id="result"
              type="text"
              value={result}
              readOnly
              className={`w-full p-2 rounded ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-800"}>History</Label>
            <ul className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              {history.map((entry, index) => (
                <li key={index} onClick={() => setResult(entry.split(" = ")[1])}>{entry}</li>
              ))}
            </ul>
          </div>
          <Button onClick={clear} className={isDarkMode ? "bg-red-600 text-white" : "bg-red-500 text-white"}>
            Clear
          </Button>
        </CardContent>
      </motion.div>
    </motion.div>
  );
}
