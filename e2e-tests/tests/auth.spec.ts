import { expect, test } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Sign In Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Profile" })).toBeVisible();
});

test("should allow the user to sign up", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 9000) + 10000
  }@test.com`;
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole("link", { name: "Sign Up" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Sign Up Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Profile" })).toBeVisible();
});
