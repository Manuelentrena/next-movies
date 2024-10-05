// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

let title = "batman";
let type = "all";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: (key) => {
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
const setSearchParams = (newTitle, newType) => {
  title = newTitle;
  type = newType;
};

module.exports = { setSearchParams };
