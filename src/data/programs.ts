const programs = [
  {
    id: 1,
    name: "Silver",
    liability: 20000.0,
    description: " Медицинское лечение, репатриация и другое",
    coverages: {
      medicine: 10000.0,
      accident: 5500.0,
      covid: 0.0,
      evacuation: 4000.0,
      transportation: 0.0,
      compensation: 500.0,
    },
  },
  {
    id: 2,
    name: "Gold",
    liability: 60000.0,
    description: "Всё вышеперечисленное + спасательная операция",
    coverages: {
      medicine: 30000.0,
      accident: 11500.0,
      covid: 0.0,
      evacuation: 8000.0,
      transportation: 9000.0,
      compensation: 1500.0,
    },
  },
  {
    id: 3,
    name: "Platinum",
    liability: 90000.0,
    description: "Всё вышеперечисленное во всех странах мира",
    coverages: {
      medicine: 40000.0,
      accident: 17000.0,
      covid: 0.0,
      evacuation: 12000.0,
      transportation: 18000.0,
      compensation: 3000.0,
    },
  },
  {
    id: 4,
    name: "STOPVIRUS |",
    liability: 60000.0,
    description: "Всё вышеперечисленное + COVID",
    coverages: {
      medicine: 27000.0,
      accident: 11500.0,
      covid: 3000.0,
      evacuation: 8000.0,
      transportation: 9000.0,
      compensation: 1500.0,
    },
  },
  {
    id: 5,
    name: "STOPVIRUS ||",
    liability: 90000.0,
    description: "Всё вышеперечисленное + COVID, во всех странах",
    coverages: {
      medicine: 35000.0,
      accident: 17000.0,
      covid: 5000.0,
      evacuation: 12000.0,
      transportation: 18000.0,
      compensation: 3000.0,
    },
  },
];

export default programs;
