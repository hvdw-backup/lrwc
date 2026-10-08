import { isValidEmail } from "./helpers";

describe("isValidEmail", () => {
  it("returns false if no @ symbol", () => {
    expect(isValidEmail("user.example.com")).toBe(false);
  });

  it("returns false if there is no dot in the domain", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("returns false if the local part is missing", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });

  it("returns false if there is more than one @ symbol", () => {
    expect(isValidEmail("user@@example.com")).toBe(false);
  });

  it("returns true if valid email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("accepts valid email addresses with uppercase letters", () => {
    expect(isValidEmail("User.Name@Example.COM")).toBe(true);
  });
});
