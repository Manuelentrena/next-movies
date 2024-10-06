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

let title = "batman";
let type = "all";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: (key: string) => {
        if (key === "title") return title;
        if (key === "type") return type;
        return null;
      },
    }),
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
});

// Exportar funciones para manipular los valores en los tests
export const setSearchParams = (newTitle: string, newType: TypesMovie) => {
  title = newTitle;
  type = newType;
};
