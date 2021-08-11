const { test, expect } = require('@playwright/test');
const is_number = require('is-number');

//1. Šiuo testu patikrinau ar yra visi įvedimo laukai. 9 build'as parodė, kad nėra 2 reikšmės įvedimo lauko, 
//todėl veiksmai negali būti atlikti. Kituose testuose 9 build'o nenaudojau.
const selectbuildVisible = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
selectbuildVisible.forEach(buildvalue => {
    test.only(`Checks if all input fields are visible. Build No3. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    const Number1 = await page.isVisible('#number1Field');
    const Number2 = await page.isVisible('#number2Field');
    const Dropdown = await page.isVisible('#selectOperationDropdown');
    const Calculate = await page.isVisible('#calculateButton');
    const Answer = await page.isVisible('#numberAnswerField');
    expect(Number1).toBe(true);
    expect(Number2).toBe(true);
    console.log(Number2);
    expect(Dropdown).toBe(true);
    expect(Calculate).toBe(true);
    expect(Answer).toBe(true);
  });
})

//2.
const selectbuildSubstract = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const testvaluearraySubstract = ['5','2', 'a', '-2', '0', '7.5'];
const expectedresultSubstract = ['1','-2', "", '-6', '-4', '3.5' ];
let testValueIndex=0;
selectbuildSubstract.forEach(buildvalue => {
    test.only(`Checks if Substract result is correct. Build No. ${buildvalue}`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild', buildvalue);
        testValueIndex=0;
        for (const testvalue of testvaluearraySubstract){
            await page.fill('#number1Field', testvalue);
            await page.fill('#number2Field', '4');
            await page.selectOption('#selectOperationDropdown', '1');
            await page.click('#calculateButton');
            const value = await page.inputValue('#numberAnswerField');
            const errormessageSubstract = await page.isVisible('#errorMsgField');  
            expect(value).toBe(expectedresultSubstract[testValueIndex]);
            console.log(value);
            console.log(errormessageSubstract);
            await page.click('#clearButton');
            testValueIndex=testValueIndex+1;
        };
      });
})

//3.
const selectbuildInteger = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuildInteger.forEach(buildvalue => {
    test.only(`Checks if result is an integer. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '7.5');
    await page.fill('#number2Field', '4');
    await page.selectOption('#selectOperationDropdown', '1');
    await page.click('#calculateButton');
    const valuebefore = await page.inputValue('#numberAnswerField');
    await page.click('#integerSelect');
    const valueInteger = await page.inputValue('#numberAnswerField');
    expect(Number.isInteger(Number(valueInteger))).toBeTruthy();
    console.log((Number(valueInteger)));
     });
})

//4.
const selectbuildAdd = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const testvaluearrayAdd = ['5','2', 'a', '-2', '0', '7.5','-8'];
const expectedresultAdd = ['9','6', "", '2', '4', '11.5', '-4'];
let testValueIndex1=0;
    selectbuildAdd.forEach(buildvalue => {
    test.only(`Checks if Add result is correct. Build No. ${buildvalue}`, async ({ page }) => {
        await page.goto('https://testsheepnz.github.io/BasicCalculator');
        await page.selectOption('#selectBuild', buildvalue);
        testValueIndex1=0;
        for (const testvalue of testvaluearrayAdd){
            await page.fill('#number1Field', testvalue);
            await page.fill('#number2Field', '4');
            await page.selectOption('#selectOperationDropdown', '0');
            await page.click('#calculateButton');
            const value1 = await page.inputValue('#numberAnswerField');
            const errormessageAdd = await page.isVisible('#errorMsgField');  
            expect(value1).toBe(expectedresultAdd[testValueIndex1]);
            console.log(value1);
            console.log(errormessageAdd);
            await page.click('#clearButton');
            testValueIndex1=testValueIndex1+1;
        };
      });
})

//5.
const selectbuild2 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild2.forEach(buildvalue => {
    test.only(`Checks if division by 0 is impossible. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '7');
    await page.fill('#number2Field', '0');
    await page.selectOption('#selectOperationDropdown', '3');
    await page.click('#calculateButton');
    const value = await page.inputValue('#numberAnswerField');
    console.log(value); 
    const errormessage = await page.isVisible('#errorMsgField');  
    expect(errormessage).toBe(true);
          });
})


//Net ir prototype nepraeina
const selectbuild4 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild4.forEach(buildvalue => {
    test(`Checks the result of multiply. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '7');
    await page.fill('#number2Field', '0.1');
    await page.selectOption('#selectOperationDropdown', '2');
    await page.click('#calculateButton');
    const value = await page.inputValue('#numberAnswerField');
    console.log(value); 
    expect(value).toBe('0.7');
      });
})

//4 
const selectbuild9 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild9.forEach(buildvalue => {
    test(`Checks if check box is checked before click. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    const result = await page.isChecked('#integerSelect');
    expect(result).toBeTruthy();
    console.log(result);
       });
})

//7 ir 8 fail
const selectbuild5 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild5.forEach(buildvalue => {
    test(`Checks if result is negative. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '7');
    await page.fill('#number2Field', '10');
    await page.selectOption('#selectOperationDropdown', '1');
    await page.click('#calculateButton');
    const resultvalue = await page.inputValue('#numberAnswerField');
    console.log(resultvalue); 
    expect(resultvalue).toBe('-3');
      });
})

//2,7,8 fail.
const selectbuild6 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild6.forEach(buildvalue => {
    test(`Checks if result of concatenate action is correct. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '-5');
    await page.fill('#number2Field', '-7');
    await page.selectOption('#selectOperationDropdown', '4');
    await page.click('#calculateButton');
    const resultvalue = await page.inputValue('#numberAnswerField');
    console.log(resultvalue); 
    expect(resultvalue).toBe('-5-7');
      });
})

//7,8 fail
const selectbuild7 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild7.forEach(buildvalue => {
    test(`Checks if result of divide action is correct. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '10');
    await page.fill('#number2Field', '5');
    await page.selectOption('#selectOperationDropdown', '3');
    await page.click('#calculateButton');
    const resultvalue = await page.inputValue('#numberAnswerField');
    console.log(resultvalue); 
    expect(resultvalue).toBe('2');
      });
})

//Neteisingas net ir prototype
const selectbuild8 = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
selectbuild8.forEach(buildvalue => {
    test(`Checks if result of sum of x.xxxx values is correct. Build No. ${buildvalue}`, async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator');
    await page.selectOption('#selectBuild', buildvalue);
    await page.fill('#number1Field', '0.0003');
    await page.fill('#number2Field', '0.0005');
    await page.selectOption('#selectOperationDropdown', '0');
    await page.click('#calculateButton');
    const resultvalue = await page.inputValue('#numberAnswerField');
    console.log(resultvalue); 
    expect(resultvalue).toBe('0.0008');
      });
})





