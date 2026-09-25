// Prototype/demo prediction engine. This is NOT a clinically validated AI model.
export function calculateRisk(input={}){
 let score=10; const factors=[];
 const add=(label,points,reason)=>{score+=points; if(points>0)factors.push({label,points,reason})};
 const temp=Number(input.temperature); if(Number.isFinite(temp)){if(temp>=39.5)add('Temperature',20,'High temperature pattern');else if(temp>=39)add('Temperature',10,'Slightly elevated temperature')}
 const milk=input.milkProduction||input.milkYieldStatus; if(milk==='Reduced')add('Milk Production',10,'Reduced production'); if(milk==='Significantly Reduced')add('Milk Production',20,'Significant production drop');
 if(input.milkAppearance==='Abnormal')add('Milk Appearance',15,'Abnormal appearance observed');
 if(input.udderCondition==='Swelling')add('Udder Condition',15,'Swelling reported'); if(input.udderCondition==='Heat')add('Udder Condition',15,'Udder heat reported'); if(input.udderCondition==='Pain')add('Udder Condition',20,'Udder pain reported');
 if(input.appetite==='Reduced')add('Appetite',8,'Reduced appetite'); if(input.appetite==='Very Low')add('Appetite',15,'Very low appetite');
 if(input.activity==='Slightly Reduced')add('Activity',8,'Slightly reduced activity'); if(input.activity==='Significantly Reduced')add('Activity',15,'Significantly reduced activity');
 if(input.previousMastitis==='Yes')add('Previous Mastitis',12,'Previous history recorded');
 const days=Number(input.daysSinceCalving); if(Number.isFinite(days)&&days>=0){const p=days<=14?6:days<=60?3:0;add('Days Since Calving',p,p?'Early post-calving period':'No added contribution')}
 score=Math.max(0,Math.min(100,score)); let level=score<30?'LOW':score<60?'MODERATE':score<80?'HIGH':'VERY HIGH';
 return {score,level,factors};
}
