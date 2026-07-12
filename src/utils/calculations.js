const FACTORS = [
  { name: 'Genetic Inheritance', min: 9.333, max: 10.777 },
  { name: 'Constitutional Vitality', min: 8.111, max: 9.111 },
  { name: 'Mental Patterns', min: 6.111, max: 7.111 },
  { name: 'Intellectual Capacity', min: 6.333, max: 6.999 },
  { name: 'Emotional Foundation', min: 7.111, max: 7.999 },
  { name: 'Spiritual Lineage', min: 5.011, max: 6.011 },
  { name: 'Soul Connections', min: 5.111, max: 6.222 },
];

export function calculateLegacy(dobString) {
  // dobString format: "YYYY-MM-DD"
  const [year, month, day] = dobString.split('-').map(Number);
  
  const isOddDay = day % 2 !== 0;

  // Simple deterministic pseudo-random based on date
  const seed = year * 10000 + month * 100 + day;
  const random = (offset) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  let motherValues = [];
  let fatherValues = [];
  
  let motherSum = 0;
  let fatherSum = 0;

  // Generate initial values within ranges
  FACTORS.forEach((factor, index) => {
    // Generate values between min and max
    let mVal = factor.min + random(index) * (factor.max - factor.min);
    let fVal = factor.min + random(index + 10) * (factor.max - factor.min);
    
    // Adjust slightly to favor Mother or Father based on Odd/Even day
    if (isOddDay) {
       mVal = factor.min + 0.6 * (factor.max - factor.min) + random(index) * 0.4 * (factor.max - factor.min);
       fVal = factor.min + random(index + 10) * 0.4 * (factor.max - factor.min);
    } else {
       fVal = factor.min + 0.6 * (factor.max - factor.min) + random(index + 10) * 0.4 * (factor.max - factor.min);
       mVal = factor.min + random(index) * 0.4 * (factor.max - factor.min);
    }

    motherValues.push(mVal);
    fatherValues.push(fVal);
    motherSum += mVal;
    fatherSum += fVal;
  });

  const totalSum = motherSum + fatherSum;

  // Normalize to exactly 100
  // To avoid breaking the min/max bounds, we just carefully scale the offset from the minimums
  const totalMinSum = FACTORS.reduce((acc, f) => acc + f.min, 0) * 2;
  const targetExtra = 100 - totalMinSum;
  const currentExtra = totalSum - totalMinSum;
  const scale = targetExtra / currentExtra;

  let finalMotherSum = 0;
  let finalFatherSum = 0;
  
  const results = FACTORS.map((factor, i) => {
    const finalM = factor.min + (motherValues[i] - factor.min) * scale;
    const finalF = factor.min + (fatherValues[i] - factor.min) * scale;
    
    finalMotherSum += finalM;
    finalFatherSum += finalF;

    return {
      name: factor.name,
      mother: finalM,
      father: finalF,
      total: finalM + finalF
    };
  });
  
  return {
    factors: results,
    motherTotal: finalMotherSum,
    fatherTotal: finalFatherSum,
    grandTotal: finalMotherSum + finalFatherSum,
    higherParent: finalMotherSum > finalFatherSum ? 'Mother' : (finalFatherSum > finalMotherSum ? 'Father' : 'Equal')
  };
}
