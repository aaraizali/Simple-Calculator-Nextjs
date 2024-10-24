"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
      default:
        return;
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [num1, num2]); // Only num1 and num2 as dependencies

  return (
    <motion.div
      className={`flex flex-col items-center justify-center h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl mb-6 mx-auto p-5">
        <motion.div
          className="flex items-center justify-between space-x-4"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="flex items-center space-x-2 bg-indigo-600 text-white hover:bg-indigo-500 transition duration-300"
            onClick={toggleDarkMode}
          >
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
        className={`w-full max-w-md p-6 shadow-lg rounded-lg border transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
        animate={{ y: [-10, 0] }}
        transition={{ duration: 0.3 }}
      >
        <CardHeader>
          <CardTitle>Simple Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Number 1</Label>
          <Input type="number" value={num1} onChange={handleNum1Change} />
          <Label className="mt-4">Number 2</Label>
          <Input type="number" value={num2} onChange={handleNum2Change} />

          <div className="mt-4 flex space-x-2">
            <Button onClick={() => calculate("add")}>Add</Button>
            <Button onClick={() => calculate("subtract")}>Subtract</Button>
            <Button onClick={() => calculate("multiply")}>Multiply</Button>
            <Button onClick={() => calculate("divide")}>Divide</Button>
            <Button onClick={clear}>Clear</Button>
          </div>

          {result && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Result: {result}</h3>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">History:</h3>
              <ul>
                {history.map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </motion.div>
    </motion.div>
  );
}
