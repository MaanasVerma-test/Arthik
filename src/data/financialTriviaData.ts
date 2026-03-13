export type Topic = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
};

export type Question = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const TOPICS: Topic[] = [
  {
      id: "budgeting",
      name: "Budgeting",
      icon: "📊",
      color: "#7EC8E3",
      description: "Learn to plan and manage your money effectively."
  },
  {
      id: "saving",
      name: "Saving",
      icon: "🏦",
      color: "#A8D5BA",
      description: "Build the habit of saving for a secure future."
  },
  {
      id: "investing",
      name: "Investing",
      icon: "📈",
      color: "#F4B183",
      description: "Grow your wealth through smart investments."
  },
  {
      id: "goal_setting",
      name: "Goal Setting",
      icon: "🎯",
      color: "#85E0E0",
      description: "Set and achieve your financial goals."
  },
  {
      id: "debt_management",
      name: "Debt Management",
      icon: "💳",
      color: "#F2B5D4",
      description: "Manage and reduce debt intelligently."
  },
  {
      id: "understanding_taxes",
      name: "Understanding Taxes",
      icon: "📝",
      color: "#E8A838",
      description: "Navigate the world of taxes with confidence."
  },
  {
      id: "retirement_planning",
      name: "Retirement Planning",
      icon: "🏖️",
      color: "#B4D98C",
      description: "Plan ahead for a comfortable retirement."
  },
  {
      id: "financial_products",
      name: "Financial Products",
      icon: "🏛️",
      color: "#C9A9E4",
      description: "Understand the financial products available to you."
  },
];

export const QUESTIONS: Record<string, Question[]> = {
  "budgeting": [
      {
          question: "What is the 50/30/20 budgeting rule?",
          options: [
              "50% savings, 30% needs, 20% wants",
              "50% needs, 30% wants, 20% savings",
              "50% wants, 30% savings, 20% needs",
              "50% investments, 30% needs, 20% wants"
          ],
          correct: 1,
          explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
      },
      {
          question: "Which of the following is considered a 'need' in a budget?",
          options: [
              "Streaming subscriptions",
              "Dining out at restaurants",
              "Rent or mortgage payments",
              "Vacation travel"
          ],
          correct: 2,
          explanation: "Rent or mortgage is a necessity — it's essential housing. Dining out, streaming, and vacations are wants."
      },
      {
          question: "What is 'zero-based budgeting'?",
          options: [
              "Starting each month with zero savings",
              "Assigning every dollar of income a specific purpose so income minus expenses equals zero",
              "A budget that doesn't include any discretionary spending",
              "Spending nothing for an entire month"
          ],
          correct: 1,
          explanation: "Zero-based budgeting means every dollar is accounted for — income minus all planned spending (including savings) equals zero."
      },
      {
          question: "How often should you review and adjust your budget?",
          options: [
              "Only when you get a raise",
              "Once a year",
              "Monthly or whenever your financial situation changes",
              "Never — a good budget is set once"
          ],
          correct: 2,
          explanation: "Budgets should be reviewed monthly and adjusted when income, expenses, or goals change."
      },
      {
          question: "What is an 'emergency fund' typically used for?",
          options: [
              "Buying holiday gifts",
              "Investing in the stock market",
              "Covering unexpected expenses like medical bills or car repairs",
              "Paying for a vacation"
          ],
          correct: 2,
          explanation: "An emergency fund covers unexpected, necessary costs — it's a financial safety net, not for planned spending."
      },
  ],
  "saving": [
      {
          question: "What is 'compound interest'?",
          options: [
              "Interest charged only on the original deposit",
              "Interest earned on both the initial principal and previously earned interest",
              "A fixed interest rate that never changes",
              "Interest paid out only at the end of the term"
          ],
          correct: 1,
          explanation: "Compound interest is often called 'interest on interest' — your earnings grow on top of previous earnings."
      },
      {
          question: "How many months of expenses should an ideal emergency fund cover?",
          options: [
              "1 month",
              "3 to 6 months",
              "12 to 18 months",
              "Only 2 weeks"
          ],
          correct: 1,
          explanation: "Most financial experts recommend saving 3 to 6 months of living expenses as an emergency fund."
      },
      {
          question: "Which type of savings account typically offers the highest interest rate?",
          options: [
              "Basic checking account",
              "Regular savings account",
              "High-yield savings account",
              "Cash kept at home"
          ],
          correct: 2,
          explanation: "High-yield savings accounts offer significantly higher interest rates than traditional savings or checking accounts."
      },
      {
          question: "What does 'paying yourself first' mean?",
          options: [
              "Spending money on yourself before paying bills",
              "Setting aside savings before spending on anything else",
              "Only saving what's left after all spending",
              "Borrowing money for personal use"
          ],
          correct: 1,
          explanation: "'Pay yourself first' means automatically directing a portion of each paycheck to savings before spending on anything else."
      },
      {
          question: "What is a Certificate of Deposit (CD)?",
          options: [
              "A type of stock investment",
              "A savings product that earns interest over a fixed period with limited withdrawals",
              "A government-issued bond",
              "A credit card with deposit requirements"
          ],
          correct: 1,
          explanation: "A CD locks your money for a set term in exchange for a higher interest rate than regular savings accounts."
      },
  ],
  "investing": [
      {
          question: "What is 'diversification' in investing?",
          options: [
              "Putting all your money into one stock",
              "Spreading investments across different asset types to reduce risk",
              "Only investing in bonds",
              "Investing in your own company exclusively"
          ],
          correct: 1,
          explanation: "Diversification reduces risk by spreading investments across stocks, bonds, real estate, and other assets."
      },
      {
          question: "What is a mutual fund?",
          options: [
              "A single company's stock",
              "A pooled investment managed by professionals that invests in a diversified portfolio",
              "A type of bank loan",
              "A government savings program"
          ],
          correct: 1,
          explanation: "A mutual fund pools money from many investors to buy a diversified mix of stocks, bonds, or other securities."
      },
      {
          question: "What does 'bull market' refer to?",
          options: [
              "A market where prices are falling",
              "A market characterized by rising prices and investor optimism",
              "A market with no trading activity",
              "A market only for agricultural products"
          ],
          correct: 1,
          explanation: "A bull market is a period of generally rising prices — the opposite of a bear market."
      },
      {
          question: "What is an ETF (Exchange-Traded Fund)?",
          options: [
              "A fund that can only be bought directly from a bank",
              "A type of savings account",
              "A fund traded on stock exchanges that typically tracks an index",
              "An electronic tax filing system"
          ],
          correct: 2,
          explanation: "ETFs trade like stocks on exchanges and typically track an index, offering diversification at low cost."
      },
      {
          question: "What is 'dollar-cost averaging'?",
          options: [
              "Buying only when prices are at their lowest",
              "Investing a fixed amount regularly regardless of market conditions",
              "Converting all investments to US dollars",
              "Only investing in dollar-denominated assets"
          ],
          correct: 1,
          explanation: "Dollar-cost averaging means investing consistently over time, which smooths out the impact of market volatility."
      },
  ],
  "goal_setting": [
      {
          question: "What does S.M.A.R.T. stand for in financial goal setting?",
          options: [
              "Simple, Monetary, Achievable, Risky, Timely",
              "Specific, Measurable, Achievable, Relevant, Time-bound",
              "Savings, Money, Assets, Returns, Taxes",
              "Strategic, Managed, Affordable, Realistic, Tracked"
          ],
          correct: 1,
          explanation: "S.M.A.R.T. goals are Specific, Measurable, Achievable, Relevant, and Time-bound — a proven framework for success."
      },
      {
          question: "Which is an example of a short-term financial goal?",
          options: [
              "Saving for retirement in 30 years",
              "Building a $1,000 emergency fund within 3 months",
              "Paying off a 30-year mortgage",
              "Saving for a child's college education"
          ],
          correct: 1,
          explanation: "Short-term goals are typically achievable within a year — like building a starter emergency fund."
      },
      {
          question: "Why is it important to prioritize financial goals?",
          options: [
              "So you can ignore less important goals entirely",
              "Because resources are limited and priorities help allocate money effectively",
              "Banks require you to list goals in order",
              "It's not important — all goals should be pursued equally"
          ],
          correct: 1,
          explanation: "With limited income, prioritizing ensures the most critical goals (like emergency savings) are funded first."
      },
      {
          question: "What is a 'sinking fund'?",
          options: [
              "A fund that loses money over time",
              "Money set aside gradually for a specific planned expense",
              "A type of risky investment",
              "A fund for emergencies only"
          ],
          correct: 1,
          explanation: "A sinking fund is money saved over time for a planned future expense, like a car or vacation."
      },
      {
          question: "What role does inflation play in financial goal setting?",
          options: [
              "It has no effect on financial goals",
              "It increases the purchasing power of your savings",
              "It decreases the future value of money, meaning goals may cost more later",
              "It only affects business owners"
          ],
          correct: 2,
          explanation: "Inflation erodes purchasing power — a goal that costs $10,000 today may cost more in the future."
      },
  ],
  "debt_management": [
      {
          question: "What is the 'debt avalanche' method?",
          options: [
              "Paying off debts in random order",
              "Paying off the debt with the highest interest rate first",
              "Taking on more debt to pay existing debt",
              "Ignoring debt until it goes away"
          ],
          correct: 1,
          explanation: "The debt avalanche prioritizes the highest-interest debt — saving you the most money in interest over time."
      },
      {
          question: "What is the 'debt snowball' method?",
          options: [
              "Paying off the largest debt first",
              "Paying off the smallest debt first to build momentum",
              "Consolidating all debts into one loan",
              "Only making minimum payments"
          ],
          correct: 1,
          explanation: "The debt snowball tackles the smallest balances first for quick wins that motivate continued debt payoff."
      },
      {
          question: "What does a credit score primarily reflect?",
          options: [
              "How much money you earn",
              "Your likelihood of repaying borrowed money based on past behavior",
              "The total amount of money in your bank accounts",
              "Your employment history"
          ],
          correct: 1,
          explanation: "A credit score is a numeric assessment of creditworthiness based on payment history, credit utilization, and more."
      },
      {
          question: "What is 'debt consolidation'?",
          options: [
              "Ignoring all your debts",
              "Combining multiple debts into a single loan, often with a lower interest rate",
              "Taking out a new credit card",
              "Declaring bankruptcy"
          ],
          correct: 1,
          explanation: "Debt consolidation merges multiple debts into one payment, ideally with a lower interest rate."
      },
      {
          question: "What is a good debt-to-income ratio to maintain?",
          options: [
              "Above 50%",
              "Below 36%",
              "Exactly 100%",
              "It doesn't matter"
          ],
          correct: 1,
          explanation: "A DTI below 36% is generally considered healthy — with no more than 28% going toward housing."
      },
  ],
  "understanding_taxes": [
      {
          question: "What is 'taxable income'?",
          options: [
              "Your total salary before any deductions",
              "The portion of your income subject to tax after deductions and exemptions",
              "Only income from investments",
              "All money in your bank account"
          ],
          correct: 1,
          explanation: "Taxable income is your gross income minus allowed deductions and exemptions — it's what you actually pay tax on."
      },
      {
          question: "What is the difference between a tax deduction and a tax credit?",
          options: [
              "They are exactly the same thing",
              "A deduction reduces taxable income; a credit directly reduces the tax owed",
              "A credit reduces taxable income; a deduction reduces tax owed",
              "Neither affects how much tax you pay"
          ],
          correct: 1,
          explanation: "Deductions lower your taxable income (indirect savings), while credits reduce your actual tax bill dollar-for-dollar."
      },
      {
          question: "What is a 'progressive tax system'?",
          options: [
              "Everyone pays the same flat rate",
              "Higher income earners pay a higher percentage of their income in tax",
              "Only businesses pay taxes",
              "Tax rates decrease as income increases"
          ],
          correct: 1,
          explanation: "In a progressive system, tax rates increase with income — higher earners pay a larger percentage."
      },
      {
          question: "What does 'filing status' determine?",
          options: [
              "Which bank you use for taxes",
              "Your tax bracket, standard deduction amount, and eligibility for credits",
              "Only whether you file online or on paper",
              "Your employer's tax obligations"
          ],
          correct: 1,
          explanation: "Filing status (single, married, head of household, etc.) affects your tax rate, deduction, and credit eligibility."
      },
      {
          question: "What is a W-2 form?",
          options: [
              "A form for self-employment income",
              "A form showing annual wages and taxes withheld by an employer",
              "A tax payment receipt",
              "A form only for freelancers"
          ],
          correct: 1,
          explanation: "The W-2 is provided by employers showing total compensation and taxes withheld during the year."
      },
  ],
  "retirement_planning": [
      {
          question: "What is a 401(k) plan?",
          options: [
              "A government welfare program",
              "An employer-sponsored retirement savings plan with tax benefits",
              "A short-term savings account",
              "A type of health insurance"
          ],
          correct: 1,
          explanation: "A 401(k) is an employer-sponsored plan where employees contribute pre-tax (or Roth after-tax) dollars for retirement."
      },
      {
          question: "What is the primary benefit of starting retirement savings early?",
          options: [
              "You can retire by age 30",
              "More time for compound interest to grow your savings significantly",
              "Banks give you higher interest rates for being young",
              "Early savings are tax-free"
          ],
          correct: 1,
          explanation: "Starting early means decades of compound growth — even small early contributions can outpace larger later ones."
      },
      {
          question: "What is an IRA (Individual Retirement Account)?",
          options: [
              "A company stock plan",
              "A personal retirement savings account with tax advantages",
              "A government pension",
              "A type of insurance policy"
          ],
          correct: 1,
          explanation: "An IRA is a tax-advantaged account you open independently (Traditional for tax-deferred, Roth for tax-free growth)."
      },
      {
          question: "What does 'employer match' mean in retirement plans?",
          options: [
              "Your employer decides your retirement date",
              "Your employer contributes matching funds up to a certain percentage of your contribution",
              "Your employer pays your entire retirement",
              "You match your employer's salary"
          ],
          correct: 1,
          explanation: "Employer match is essentially free money — the company contributes to your retirement based on what you save."
      },
      {
          question: "What is the recommended percentage of income to save for retirement?",
          options: [
              "1-2%",
              "10-15%",
              "50%",
              "It depends on your employer only"
          ],
          correct: 1,
          explanation: "Financial advisors generally recommend saving 10-15% of gross income for retirement, including any employer match."
      },
  ],
  "financial_products": [
      {
          question: "What is the main purpose of life insurance?",
          options: [
              "To grow your investments",
              "To provide financial protection for dependents if the insured person dies",
              "To pay for medical expenses",
              "To save for retirement"
          ],
          correct: 1,
          explanation: "Life insurance protects your family financially by providing a death benefit when the policyholder passes away."
      },
      {
          question: "What is the difference between a debit card and a credit card?",
          options: [
              "They function identically",
              "A debit card uses money directly from your account; a credit card borrows money that must be repaid",
              "A credit card uses your savings; a debit card borrows money",
              "Debit cards have higher interest rates"
          ],
          correct: 1,
          explanation: "Debit cards spend your own money instantly; credit cards are a short-term loan that accrues interest if not paid in full."
      },
      {
          question: "What is a 'fixed deposit' (or term deposit)?",
          options: [
              "A deposit that can be withdrawn at any time",
              "A savings instrument where money is deposited for a fixed term at a guaranteed interest rate",
              "A type of stock market investment",
              "A loan from the bank"
          ],
          correct: 1,
          explanation: "Fixed deposits offer guaranteed returns by locking money for a set period at a predetermined interest rate."
      },
      {
          question: "What does 'APR' stand for on a loan or credit card?",
          options: [
              "Annual Payment Ratio",
              "Annual Percentage Rate — the yearly interest cost of borrowing",
              "Automated Payment Return",
              "Average Payment Requirement"
          ],
          correct: 1,
          explanation: "APR represents the annual cost of borrowing — including interest and fees — expressed as a percentage."
      },
      {
          question: "What is a 'money market account'?",
          options: [
              "An account for buying and selling stocks",
              "A savings account that typically offers higher interest with limited transactions",
              "A loan product for businesses",
              "A type of cryptocurrency wallet"
          ],
          correct: 1,
          explanation: "Money market accounts combine features of savings and checking, offering higher rates with some withdrawal flexibility."
      },
  ],
};
