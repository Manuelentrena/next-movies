export function mockPointerEvent() {
  const originalPointerEvent = window.PointerEvent;
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const originalReleasePointerCapture = window.HTMLElement.prototype.releasePointerCapture;
  const originalHasPointerCapture = window.HTMLElement.prototype.hasPointerCapture;

  class MockPointerEvent extends Event {
    button: number;
    ctrlKey: boolean;
    pointerType: string;
    constructor(type: string, props: PointerEventInit) {
      super(type, props);
      this.button = props.button || 0;
      this.ctrlKey = props.ctrlKey || false;
      this.pointerType = props.pointerType || "mouse";
    }
  }

  window.PointerEvent = MockPointerEvent as typeof PointerEvent;

  // Mock de las funciones del prototipo de HTMLElement
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  window.HTMLElement.prototype.releasePointerCapture = jest.fn();
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();

  // Devolvemos una función para restaurar el valor original
  return () => {
    window.PointerEvent = originalPointerEvent;
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    window.HTMLElement.prototype.releasePointerCapture = originalReleasePointerCapture;
    window.HTMLElement.prototype.hasPointerCapture = originalHasPointerCapture;
  };
}
