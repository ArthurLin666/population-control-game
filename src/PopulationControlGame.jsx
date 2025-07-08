import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
  { year: 1, title: "開放一夫多妻制", description: "你是否批准開放婚姻制度，允許一夫多妻？", choices: [ { label: "成立（生育率混亂，實際下降）", effect: -0.5 }, { label: "駁回（社會抗議導致醫療罷工）", effect: 0.3 } ] },
  { year: 2, title: "投放肺炎病毒", description: "是否釋放病毒以降低人口？", choices: [ { label: "投放（全球人數下降5%）", effectPercent: -5 }, { label: "不投放（民眾安心繁殖）", effect: 0.1 } ] },
  ...
  { year: 30, title: "最後一日｜是否結束計畫", description: "你已來到第30年，是否終止所有人口控制措施？", choices: [ { label: "終止（無更多減少）", effect: 0.0 }, { label: "延續（再削減一次）", effect: -0.6 } ] },
];

export default function PopulationControlGame() {
  const [year, setYear] = useState(1);
  const [population, setPopulation] = useState(20.0);
  const [gameOver, setGameOver] = useState(false);
  const event = events.find((e) => e.year === year);

  const handleChoice = (choice) => {
    let newPop = population;
    if (choice.effectPercent !== undefined) {
      newPop = population * (1 + choice.effectPercent / 100);
    } else {
      newPop = population + choice.effect;
    }

    newPop = parseFloat(newPop.toFixed(2));
    if (newPop > 20.0) {
      setPopulation(newPop);
      setGameOver(true);
    } else {
      setPopulation(newPop);
      setYear(year + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-2">🧬 人類人口控制遊戲</h1>
      <p className="text-xl mb-6">年份：{2070 + year - 1}｜全球人口：{population.toFixed(2)} 億人</p>

      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">🌍 地球已崩潰！人口超過 20 億！</h2>
          <p className="text-lg">你未能成功控管人類命運。</p>
        </div>
      ) : event ? (
        <Card className="w-full max-w-xl bg-gray-900 text-white border border-gray-700">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🃏 事件：{event.title}</h2>
            <p className="mb-4">{event.description}</p>
            <div className="space-y-3">
              {event.choices.map((choice, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-2">🎉 你成功讓人類熬過30年！</h2>
          <p className="text-lg">最終人口：{population.toFixed(2)} 億</p>
        </div>
      )}
    </div>
  );
}
