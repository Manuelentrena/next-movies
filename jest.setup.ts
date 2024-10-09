// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { TypesMovie } from "./core/movies/domain/Movie";

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));

let titleFinal = "batman";
let typeFinal = "all";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: (key: string) => {
        if (key === "title") return titleFinal;
        if (key === "type") return typeFinal;
        return null;
      },
    }),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
});

// Exportar funciones para manipular los valores en los tests
export const setSearchParams = ({ title, type }: { title: string; type: TypesMovie }) => {
  titleFinal = title;
  typeFinal = type;
};
