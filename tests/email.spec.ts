import { test, expect } from './baseTest';

test.describe('Email Tests', () => {
  test('TC_1_Add_Email_Account', async ({ app }) => {
    //Arrange
    const domain = 'site-tools-demo.net';
    const accountName = 'test_account';
    const email = `${accountName}@${domain}`;

    //Act
    await app.dashBoard.pinnedTools.emailAccounts.click();
    await app.emailPage.accounts.selectDomain.dropDown.selectOptionAsync(domain);
    const accountAddOn = await app.emailPage.accounts.createNewEmailAccount.accountName.addOn.textContent();
    await app.emailPage.accounts.createNewEmailAccount.accountName.input.fill(accountName);

    await app.emailPage.accounts.createNewEmailAccount.password.generate.click();
    const filledPassword = await app.emailPage.accounts.createNewEmailAccount.password.input.inputValue();

    await app.emailPage.accounts.createNewEmailAccount.createAsync();

    // Assertions
    expect(accountAddOn).toBe(`@${domain}`);
    expect(filledPassword).not.toBeFalsy();

    const notification = await app.emailPage.accounts.createNewEmailAccount.notification.presentAsync();
    expect(notification).not.toBeNull();
    if (notification) {
      expect(await notification.icon.isSuccess()).toBe(true);
      expect(await notification.heading.emphasis.textContent()).toBe(email);
    }

    const targetRow = await app.emailPage.accounts.manageEmailAccounts.table.rows.firstOrDefaultWhereAsync(
      async (row) => (await row.accountName.textContent()) == email
    );
    expect(targetRow).not.toBeNull();
  });

  test('TC_2_Add_Empty_Email_Forwarder', async ({ app }) => {
    //Arrange
    const domain = 'site-tools-demo.net';
    const expectedOptions = [
      'qa-automation-tools.com',
      'store.qa-automation-tools.com',
      'parked-qa-automation-tools.com',
      'site-tools-demo.net'
    ];

    //Act
    await app.sideNavigation.email.forwardersAsync();
    const options = await app.emailPage.forwarders.selectDomain.dropDown.optionsTextContentAsync();
    await app.emailPage.forwarders.selectDomain.dropDown.selectOptionAsync(domain);
    await app.emailPage.forwarders.createNewRule.create.click();
    const validationError = await app.emailPage.forwarders.createNewRule.forwardAllMessagesSentTo.validationError.presentAsync();

    // Assertions
    expect(options).toEqual(expect.arrayContaining(expectedOptions));
    expect(validationError).not.toBeNull();

    if (validationError) {
      expect(await validationError.message.textContent()).toBe('Required field.');
      expect(await validationError.icon.isErrorAttention()).toBe(true);
    }
  });
});
