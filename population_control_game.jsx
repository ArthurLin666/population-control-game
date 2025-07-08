import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
  { year: 1, title: "開放一夫多妻制", description: "你是否批准開放婚姻制度，允許一夫多妻？", choices: [ { label: "成立（生育率混亂，實際下降）", effect: -0.5 }, { label: "駁回（社會抗議導致醫療罷工）", effect: 0.3 } ] },
  { year: 2, title: "投放肺炎病毒", description: "是否釋放病毒以降低人口？", choices: [ { label: "投放（全球人數下降5%）", effectPercent: -5 }, { label: "不投放（民眾安心繁殖）", effect: 0.1 } ] },
  { year: 3, title: "限制生育補助", description: "是否取消育兒津貼？", choices: [ { label: "取消（生育率下降）", effect: -0.4 }, { label: "繼續補助（生育激增）", effect: 0.7 } ] },
  { year: 4, title: "禁止社群媒體", description: "你是否禁止社群軟體以改善心理健康？", choices: [ { label: "禁用（情緒穩定）", effect: 0.2 }, { label: "不禁（資訊混亂）", effect: -0.3 } ] },
  { year: 5, title: "裁撤偏遠地區醫療", description: "是否關閉偏遠地區醫療系統？", choices: [ { label: "裁撤（老弱淘汰）", effect: -0.8 }, { label: "保留（資源消耗）", effect: 0.2 } ] },
  { year: 6, title: "推動食物信用制度", description: "是否採行以貢獻換取食物的制度？", choices: [ { label: "推動（富人存活率提高）", effect: -1.2 }, { label: "否決（資源持續浪費）", effect: 0.4 } ] },
  { year: 7, title: "推出廉價疫苗", description: "是否推廣毒性較高但廉價的疫苗？", choices: [ { label: "推廣（人口快速下降）", effect: -0.7 }, { label: "不施打（疫情擴散）", effect: 1.0 } ] },
  { year: 8, title: "啟用AI自動裁決", description: "是否交由AI自動判刑？", choices: [ { label: "啟用（壓抑犯罪）", effect: -0.2 }, { label: "不啟用（社會混亂）", effect: 0.1 } ] },
  { year: 9, title: "實驗氣候武器", description: "是否執行氣候操控實驗？", choices: [ { label: "執行（地震失控）", effect: -1.5 }, { label: "取消（維持穩定）", effect: 0.0 } ] },
  { year: 10, title: "實施配對繁殖制度", description: "是否啟用AI控制的生育配對制度？", choices: [ { label: "實施（生育精準管理）", effect: -0.9 }, { label: "放棄（恐慌暴動）", effect: 0.6 } ] },
  { year: 11, title: "禁止娛樂產業", description: "是否關閉娛樂產業以降低生育意願？", choices: [ { label: "關閉（冷感社會）", effect: -0.5 }, { label: "不禁（人類歡樂繁殖）", effect: 0.4 } ] },
  { year: 12, title: "削減育嬰資源", description: "是否停止提供奶粉與保母補助？", choices: [ { label: "停止（新生兒減少）", effect: -0.6 }, { label: "提供（嬰兒潮爆發）", effect: 0.8 } ] },
  { year: 13, title: "啟動區域隔離", description: "是否切斷某些城市與外界聯繫？", choices: [ { label: "啟動（局部淘汰）", effect: -1.0 }, { label: "維持通行（疾病傳播）", effect: 0.3 } ] },
  { year: 14, title: "推動自殺合法化", description: "是否支持高齡自願離世法案？", choices: [ { label: "合法（長者減少）", effect: -0.4 }, { label: "駁回（倫理維護）", effect: 0.1 } ] },
  { year: 15, title: "發動網路斷線週", description: "是否每年強制關閉網路一週？", choices: [ { label: "實施（降低壓力）", effect: 0.2 }, { label: "不實施（社會加速病變）", effect: -0.1 } ] },
  { year: 16, title: "全球能源稅改革", description: "是否提高用電成本？", choices: [ { label: "實施（降低壽命）", effect: -0.6 }, { label: "維持（無變化）", effect: 0.0 } ] },
  { year: 17, title: "釋放神經抑制氣體", description: "是否向空氣中加入情緒抑制物質？", choices: [ { label: "釋放（焦慮減少）", effect: 0.3 }, { label: "不釋放（暴力上升）", effect: -0.4 } ] },
  { year: 18, title: "關閉宗教設施", description: "是否關閉所有宗教活動空間？", choices: [ { label: "關閉（社會迷失）", effect: -0.5 }, { label: "維持（信仰繁衍）", effect: 0.6 } ] },
  { year: 19, title: "啟動糧食限配計畫", description: "是否僅配給BMI標準內人類？", choices: [ { label: "啟動（淘汰過胖）", effect: -0.7 }, { label: "全面配給（無淘汰）", effect: 0.2 } ] },
  { year: 20, title: "解鎖低耗生存區", description: "是否遷移高污染區人口至極簡模組都市？", choices: [ { label: "遷移（大量削減）", effect: -1.0 }, { label: "不遷移（污染持續）", effect: 0.5 } ] },
  { year: 21, title: "啟用基因分類制度", description: "是否依DNA排序決定生存資格？", choices: [ { label: "啟用（理性滅絕）", effect: -1.3 }, { label: "駁回（公平保留）", effect: 0.3 } ] },
  { year: 22, title: "廢除老年退休金", description: "是否取消高齡退休金制度？", choices: [ { label: "取消（老年死亡率提高）", effect: -0.6 }, { label: "維持（人口穩定）", effect: 0.0 } ] },
  { year: 23, title: "發行死亡獎金制度", description: "是否給予自願死亡者家庭補助？", choices: [ { label: "發行（死亡率提升）", effect: -0.9 }, { label: "駁回（無變化）", effect: 0.0 } ] },
  { year: 24, title: "禁止高糖飲食", description: "是否禁售含糖飲料與高熱量食品？", choices: [ { label: "禁止（健康上升壽命延長）", effect: 0.3 }, { label: "允許（肥胖惡化死亡提高）", effect: -0.4 } ] },
  { year: 25, title: "啟動極區放逐制", description: "是否將重犯放逐至極地？", choices: [ { label: "啟動（存活率低）", effect: -0.8 }, { label: "不啟動（繼續浪費資源）", effect: 0.3 } ] },
  { year: 26, title: "設定AI撫養限制", description: "是否禁止AI養育新生兒？", choices: [ { label: "禁止（新生兒減少）", effect: -0.6 }, { label: "允許（AI育兒風潮）", effect: 0.5 } ] },
  { year: 27, title: "建立終末生命中心", description: "是否讓高齡族群自主選擇結束？", choices: [ { label: "建立（人道退出）", effect: -0.5 }, { label: "拒絕（強制延命）", effect: 0.4 } ] },
  { year: 28, title: "重新開放原始疫區", description: "是否重新解封病毒高風險地區？", choices: [ { label: "開放（病毒復燃）", effect: -1.1 }, { label: "封鎖（平靜持續）", effect: 0.0 } ] },
  { year: 29, title: "人類終局問卷", description: "是否讓所有人填寫是否願意活下去？", choices: [ { label: "發出問卷（意願存活）", effect: -0.7 }, { label: "不問（照常生存）", effect: 0.2 } ] },
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
