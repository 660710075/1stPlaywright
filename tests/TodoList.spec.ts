import {test, expect} from '@playwright/test';

test('Should navigate to Todo webapplication', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page).toHaveTitle(/TodoMVC/);
    await expect(page.locator('h1')).toHaveText('todos');
    await expect(page.locator('.new-todo')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty();

    const todoCount = await page.locator('div li label').count();

    if (todoCount == 0) {
        console.log("The todo list is currently empty.");
    }
});

test('should add a new todo item', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page).toHaveTitle(/TodoMVC/);
    for (let i = 1; i <= 3; i++) {
        await page.getByRole('textbox', {name: 'What needs to be done?'}).fill(`test todo ${i}`);
        await page.getByRole('textbox', {name: 'What needs to be done?'}).press('Enter');
    }
    const todoItems = page.locator('[data-testid="todo-title"]');
    await expect(todoItems).toHaveCount(3);
});

test('should mark a todo item as completed', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page).toHaveTitle(/TodoMVC/);
    const textTodo = 'test todo';
    var TextTitle = '';
    for (let i = 1; i <= 3; i++) {
        await page.getByRole('textbox', {name: 'What needs to be done?'}).fill(textTodo + ` ${i}`);
        await page.getByRole('textbox', {name: 'What needs to be done?'}).press('Enter');
        if (i === 2) {
            TextTitle = textTodo + ` ${i}`;
        }
    }
    // await page.locator('div li').filter({hasText: TextTitle}).getByRole('checkbox').check();
    await page.locator('[data-testid="todo-item"]').nth(1).getByRole('checkbox').check();
    const completedItems = page.locator('div li.completed');
    await expect(completedItems).toHaveCount(1);
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('div li.completed label')).toHaveText(TextTitle);
    await page.getByRole('link', { name: 'All' }).click();

});

test('should delete a todo item', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page).toHaveTitle(/TodoMVC/);
    const textTodo = 'test todo';
    for (let i = 1; i <= 3; i++) {
        await page.getByRole('textbox', {name: 'What needs to be done?'}).fill(textTodo + ` ${i}`);
        await page.getByRole('textbox', {name: 'What needs to be done?'}).press('Enter');
    }
    const todoItems = page.locator('[data-testid="todo-title"]');
    await expect(todoItems).toHaveCount(3);
    const itemToDelete = textTodo + ' 1';
    
    await expect(page.locator('.todo-list li', {hasText: itemToDelete})).toBeVisible();
    await page.locator('.todo-list li', {hasText: itemToDelete}).hover();
    await page.locator('.todo-list li', {hasText: itemToDelete}).locator('button.destroy').click();
    await expect(todoItems).toHaveCount(2);
});

test('test', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    let text = "test todo";
    await page.locator('.new-todo').click();
    await page.locator('.new-todo').fill(text);
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('[data-testid="todo-title"]')).toHaveText(text);
});
