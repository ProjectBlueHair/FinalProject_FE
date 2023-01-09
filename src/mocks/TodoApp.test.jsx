import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";

test("renders todos", async () => {
  render(<TodoApp />);

  const listitems = await screen.findAllByRole("listitem");
  expect(listitems).toHaveLength(3);

  userEvent.type(screen.getByRole("textbox"), "공부하기");
  userEvent.click(screen.getByRole("button"));

  expect(await screen.findByText("공부하기")).toBeInTheDocument();
});