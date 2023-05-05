import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { expect, jest, test } from "@jest/globals"

test('Does the "Select a category" text appear?', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select a category!/i);
  expect(linkElement).toBeInTheDocument();
});

test("Click on the dropdown and select JS. Do buttons appear?", async () => {
  render(<App />);
  let dropdown = await screen.findByText(/Select a category!/i);
  userEvent.click(dropdown);
  let js = await screen.findByText(/JS/i);
  userEvent.click(js);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Click on the dropdown and select CSS. Do buttons appear?", async () => {
  render(<App />);
  let dropdown = await screen.findByText(/Select a category!/i);
  userEvent.click(dropdown);
  let css = await screen.findByText(/CSS/i);
  userEvent.click(css);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Does the score appear?", async () => {
  render(<App />);
  let dropdown = screen.getByRole('combobox');
  userEvent.click(dropdown);
  const css = screen.getByRole('option', {
    name: /css/i
  })
  userEvent.selectOptions(dropdown, css);
  await userEvent.click(css);
  const scoreElement = await screen.findByText(/Score: /i);
  expect(scoreElement).toBeInTheDocument();
});

/* perfect for debugging
screen.logTestingPlaygroundURL() */