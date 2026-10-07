export type Category = "Верх" | "Низ" | "Обувь" | "Аксессуары";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  sizes: string[];
  tag?: string;
  desc: string;
}

export const CATEGORIES: Array<"Все" | Category> = ["Все", "Верх", "Низ", "Обувь", "Аксессуары"];

const CLOTHES = ["XS", "S", "M", "L", "XL"];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Худи «Тень»",
    category: "Верх",
    price: 8900,
    image: "/images/hoodie.jpg",
    sizes: CLOTHES,
    tag: "Новинка",
    desc: "Плотный футер 480 г/м², оверсайз-крой, двойной капюшон.",
  },
  {
    id: 2,
    name: "Футболка «Пустота»",
    category: "Верх",
    price: 3900,
    image: "/images/tee.jpg",
    sizes: CLOTHES,
    desc: "Кремовый хлопок 240 г/м², минимальный принт на груди.",
  },
  {
    id: 3,
    name: "Бомбер «Норд»",
    category: "Верх",
    price: 14500,
    image: "/images/jacket.jpg",
    sizes: CLOTHES,
    tag: "Лимит",
    desc: "Матовая ткань с мембраной, утилитарные карманы.",
  },
  {
    id: 4,
    name: "Карго «Груз»",
    category: "Низ",
    price: 7400,
    image: "/images/cargo.jpg",
    sizes: CLOTHES,
    desc: "Широкая посадка, шесть карманов, усиленные швы.",
  },
  {
    id: 5,
    name: "Кроссовки «Шаг»",
    category: "Обувь",
    price: 12900,
    image: "/images/sneakers.jpg",
    sizes: ["40", "41", "42", "43", "44"],
    tag: "Хит",
    desc: "Массивная подошва, монохромная кожа, мягкая стелька.",
  },
  {
    id: 6,
    name: "Овершот «Слой»",
    category: "Верх",
    price: 6200,
    image: "/images/shirt.jpg",
    sizes: CLOTHES,
    desc: "Шерстяной микс, нагрудные карманы, рубашечный крой.",
  },
  {
    id: 7,
    name: "Джинсы «Шов»",
    category: "Низ",
    price: 8200,
    image: "/images/jeans.jpg",
    sizes: CLOTHES,
    desc: "Чёрный винтажный деним, свободная широкая штанина.",
  },
  {
    id: 8,
    name: "Бини «Акцент»",
    category: "Аксессуары",
    price: 2400,
    image: "/images/beanie.jpg",
    sizes: ["ONE SIZE"],
    desc: "Ребристая вязка, отворот, мягкая пряжа без колючести.",
  },
];

export const FREE_DELIVERY_FROM = 10000;
