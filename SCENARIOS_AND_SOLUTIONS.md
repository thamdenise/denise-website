# Tipalti Expense Policy Practice Scenarios and Solutions

Total scenarios: 10

This document mirrors the practice app and contains full problem context plus reference solutions.

## 1. Validate an Expense Against Company Policy

**Problem statement**

Given an expense and policy limits, decide if the expense is valid and return policy violation reasons.

**Example input**

```json
{
  "expense": {
    "amount": 120,
    "category": "meal",
    "hasReceipt": true,
    "submittedDaysAfter": 10
  },
  "policy": {
    "maxByCategory": {
      "meal": 100
    },
    "receiptRequiredOver": 75,
    "maxSubmissionDays": 30
  }
}
```

**Expected output**

```json
{
  "valid": false,
  "reasons": [
    "AMOUNT_EXCEEDS_CATEGORY_LIMIT"
  ]
}
```

**Edge cases**

- Unknown category should fail explicitly
- Negative or zero amounts
- Late submission beyond policy window

**Follow-up requirement changes an interviewer might add**

- Add weekend-only category restrictions
- Add per-country policy differences
- Include warning vs blocking violations

**What the interviewer is likely testing**

Rule decomposition, validation design, and returning structured errors.

**TypeScript solution**

```ts
type Expense = { amount: number; category: string; hasReceipt: boolean; submittedDaysAfter: number };
type Policy = { maxByCategory: Record<string, number>; receiptRequiredOver: number; maxSubmissionDays: number };
type ValidationResult = { valid: boolean; reasons: string[] };

function validateExpensePolicy(expense: Expense, policy: Policy): ValidationResult {
  const reasons: string[] = [];
  if (expense.amount <= 0) reasons.push("INVALID_AMOUNT");
  if (!(expense.category in policy.maxByCategory)) reasons.push("UNKNOWN_CATEGORY");
  if (expense.category in policy.maxByCategory && expense.amount > policy.maxByCategory[expense.category]) {
    reasons.push("AMOUNT_EXCEEDS_CATEGORY_LIMIT");
  }
  if (expense.amount > policy.receiptRequiredOver && !expense.hasReceipt) reasons.push("RECEIPT_REQUIRED");
  if (expense.submittedDaysAfter > policy.maxSubmissionDays) reasons.push("LATE_SUBMISSION");
  return { valid: reasons.length === 0, reasons };
}
```

**JavaScript solution**

```js
function validateExpensePolicy(expense, policy) {
  const reasons = [];
  if (expense.amount <= 0) reasons.push("INVALID_AMOUNT");
  if (!(expense.category in policy.maxByCategory)) reasons.push("UNKNOWN_CATEGORY");
  if (expense.category in policy.maxByCategory && expense.amount > policy.maxByCategory[expense.category]) {
    reasons.push("AMOUNT_EXCEEDS_CATEGORY_LIMIT");
  }
  if (expense.amount > policy.receiptRequiredOver && !expense.hasReceipt) reasons.push("RECEIPT_REQUIRED");
  if (expense.submittedDaysAfter > policy.maxSubmissionDays) reasons.push("LATE_SUBMISSION");
  return { valid: reasons.length === 0, reasons };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Valid meal expense",
    "args": [
      {
        "amount": 80,
        "category": "meal",
        "hasReceipt": true,
        "submittedDaysAfter": 2
      },
      {
        "maxByCategory": {
          "meal": 100
        },
        "receiptRequiredOver": 75,
        "maxSubmissionDays": 30
      }
    ],
    "expected": {
      "valid": true,
      "reasons": []
    }
  },
  {
    "name": "Missing receipt over threshold",
    "args": [
      {
        "amount": 120,
        "category": "meal",
        "hasReceipt": false,
        "submittedDaysAfter": 2
      },
      {
        "maxByCategory": {
          "meal": 200
        },
        "receiptRequiredOver": 75,
        "maxSubmissionDays": 30
      }
    ],
    "expected": {
      "valid": false,
      "reasons": [
        "RECEIPT_REQUIRED"
      ]
    }
  },
  {
    "name": "Unknown category",
    "args": [
      {
        "amount": 50,
        "category": "gift",
        "hasReceipt": true,
        "submittedDaysAfter": 2
      },
      {
        "maxByCategory": {
          "meal": 100
        },
        "receiptRequiredOver": 75,
        "maxSubmissionDays": 30
      }
    ],
    "expected": {
      "valid": false,
      "reasons": [
        "UNKNOWN_CATEGORY"
      ]
    }
  }
]
```

## 2. Decide Approval Status for an Expense

**Problem statement**

Return approval status based on amount tiers and policy violations.

**Example input**

```json
{
  "expense": {
    "amount": 1400,
    "policyViolations": []
  }
}
```

**Expected output**

```json
PENDING_FINANCE
```

**Edge cases**

- Negative amount should reject
- Any policy violation should reject
- Boundary amounts exactly on thresholds

**Follow-up requirement changes an interviewer might add**

- Department-specific approval thresholds
- Escalation if manager not available
- Auto-approval budget remaining check

**What the interviewer is likely testing**

Clear branching logic and prioritization of fail-fast business rules.

**TypeScript solution**

```ts
type Expense = { amount: number; policyViolations: string[] };
type ApprovalStatus = "AUTO_APPROVED" | "PENDING_MANAGER" | "PENDING_FINANCE" | "REJECTED";

function decideApprovalStatus(expense: Expense): ApprovalStatus {
  if (expense.amount <= 0) return "REJECTED";
  if (expense.policyViolations.length > 0) return "REJECTED";
  if (expense.amount <= 200) return "AUTO_APPROVED";
  if (expense.amount <= 1000) return "PENDING_MANAGER";
  return "PENDING_FINANCE";
}
```

**JavaScript solution**

```js
function decideApprovalStatus(expense) {
  if (expense.amount <= 0) return "REJECTED";
  if (expense.policyViolations.length > 0) return "REJECTED";
  if (expense.amount <= 200) return "AUTO_APPROVED";
  if (expense.amount <= 1000) return "PENDING_MANAGER";
  return "PENDING_FINANCE";
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Auto approve small amount",
    "args": [
      {
        "amount": 80,
        "policyViolations": []
      }
    ],
    "expected": "AUTO_APPROVED"
  },
  {
    "name": "Manager tier",
    "args": [
      {
        "amount": 300,
        "policyViolations": []
      }
    ],
    "expected": "PENDING_MANAGER"
  },
  {
    "name": "Finance tier",
    "args": [
      {
        "amount": 1400,
        "policyViolations": []
      }
    ],
    "expected": "PENDING_FINANCE"
  },
  {
    "name": "Violation rejects",
    "args": [
      {
        "amount": 100,
        "policyViolations": [
          "RECEIPT_REQUIRED"
        ]
      }
    ],
    "expected": "REJECTED"
  }
]
```

## 3. Detect Duplicate Expenses

**Problem statement**

Return expense IDs that are duplicates of earlier items by employee + date + merchant(normalized) + amount.

**Example input**

```json
{
  "expenses": [
    {
      "id": "e1",
      "employeeId": "u1",
      "date": "2026-03-01",
      "merchant": "Uber",
      "amount": 20
    },
    {
      "id": "e2",
      "employeeId": "u1",
      "date": "2026-03-01",
      "merchant": " uber ",
      "amount": 20
    }
  ]
}
```

**Expected output**

```json
[
  "e2"
]
```

**Edge cases**

- Case-insensitive and trim-normalized merchant
- Same merchant/date but different amount should not duplicate
- Duplicate chains: second and third duplicates of first

**Follow-up requirement changes an interviewer might add**

- Allow fuzzy amount tolerance for FX rounding
- Ignore duplicates if transactions have approved override
- Include card-last4 in duplicate key

**What the interviewer is likely testing**

Hash-key design, normalization, and stable ordering of results.

**TypeScript solution**

```ts
type Expense = { id: string; employeeId: string; date: string; merchant: string; amount: number };

function detectDuplicateExpenses(expenses: Expense[]): string[] {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const e of expenses) {
    const key = [e.employeeId, e.date, e.merchant.trim().toLowerCase(), e.amount].join("|");
    if (seen.has(key)) {
      duplicates.push(e.id);
    } else {
      seen.add(key);
    }
  }
  return duplicates;
}
```

**JavaScript solution**

```js
function detectDuplicateExpenses(expenses) {
  const seen = new Set();
  const duplicates = [];
  for (const e of expenses) {
    const key = [e.employeeId, e.date, e.merchant.trim().toLowerCase(), e.amount].join("|");
    if (seen.has(key)) duplicates.push(e.id);
    else seen.add(key);
  }
  return duplicates;
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Detect normalized duplicate",
    "args": [
      [
        {
          "id": "e1",
          "employeeId": "u1",
          "date": "2026-03-01",
          "merchant": "Uber",
          "amount": 20
        },
        {
          "id": "e2",
          "employeeId": "u1",
          "date": "2026-03-01",
          "merchant": " uber ",
          "amount": 20
        }
      ]
    ],
    "expected": [
      "e2"
    ]
  },
  {
    "name": "Different employee is not duplicate",
    "args": [
      [
        {
          "id": "e1",
          "employeeId": "u1",
          "date": "2026-03-01",
          "merchant": "Uber",
          "amount": 20
        },
        {
          "id": "e2",
          "employeeId": "u2",
          "date": "2026-03-01",
          "merchant": "Uber",
          "amount": 20
        }
      ]
    ],
    "expected": []
  }
]
```

## 4. Summarise Expenses by Category and Status

**Problem statement**

Aggregate expenses into totals by category and by status, and compute grand total amount.

**Example input**

```json
{
  "expenses": [
    {
      "category": "meal",
      "status": "APPROVED",
      "amount": 10
    },
    {
      "category": "meal",
      "status": "PENDING",
      "amount": 20
    }
  ]
}
```

**Expected output**

```json
{
  "byCategory": {
    "meal": 30
  },
  "byStatus": {
    "APPROVED": 10,
    "PENDING": 20
  },
  "totalAmount": 30
}
```

**Edge cases**

- Empty list should return empty maps and zero
- Unknown statuses should still aggregate
- Zero amount entries

**Follow-up requirement changes an interviewer might add**

- Also return counts per category/status
- Round amounts with currency precision
- Support date-range filtering before aggregation

**What the interviewer is likely testing**

Data aggregation correctness and clean object updates.

**TypeScript solution**

```ts
type Expense = { category: string; status: string; amount: number };
type Summary = { byCategory: Record<string, number>; byStatus: Record<string, number>; totalAmount: number };

function summariseExpenses(expenses: Expense[]): Summary {
  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let totalAmount = 0;

  for (const expense of expenses) {
    byCategory[expense.category] = (byCategory[expense.category] ?? 0) + expense.amount;
    byStatus[expense.status] = (byStatus[expense.status] ?? 0) + expense.amount;
    totalAmount += expense.amount;
  }

  return { byCategory, byStatus, totalAmount };
}
```

**JavaScript solution**

```js
function summariseExpenses(expenses) {
  const byCategory = {};
  const byStatus = {};
  let totalAmount = 0;

  for (const expense of expenses) {
    byCategory[expense.category] = (byCategory[expense.category] ?? 0) + expense.amount;
    byStatus[expense.status] = (byStatus[expense.status] ?? 0) + expense.amount;
    totalAmount += expense.amount;
  }

  return { byCategory, byStatus, totalAmount };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Standard summary",
    "args": [
      [
        {
          "category": "meal",
          "status": "APPROVED",
          "amount": 10
        },
        {
          "category": "meal",
          "status": "PENDING",
          "amount": 20
        },
        {
          "category": "taxi",
          "status": "APPROVED",
          "amount": 15
        }
      ]
    ],
    "expected": {
      "byCategory": {
        "meal": 30,
        "taxi": 15
      },
      "byStatus": {
        "APPROVED": 25,
        "PENDING": 20
      },
      "totalAmount": 45
    }
  },
  {
    "name": "Empty summary",
    "args": [
      []
    ],
    "expected": {
      "byCategory": {},
      "byStatus": {},
      "totalAmount": 0
    }
  }
]
```

## 5. Determine Receipt Requirements

**Problem statement**

Return whether a receipt is required and explain why based on category and amount thresholds.

**Example input**

```json
{
  "expense": {
    "category": "meal",
    "amount": 80
  },
  "policy": {
    "defaultThreshold": 75,
    "alwaysRequiredCategories": [
      "hotel"
    ]
  }
}
```

**Expected output**

```json
{
  "required": true,
  "reason": "ABOVE_DEFAULT_THRESHOLD"
}
```

**Edge cases**

- Always-required categories
- Threshold boundary equality
- Zero/negative amounts

**Follow-up requirement changes an interviewer might add**

- Different thresholds per country
- Exemptions by role
- Photo quality checks

**What the interviewer is likely testing**

Readable rule precedence and reason-code returns.

**TypeScript solution**

```ts
type Expense = { category: string; amount: number };
type Policy = { defaultThreshold: number; alwaysRequiredCategories: string[] };
type ReceiptDecision = { required: boolean; reason: string };

function determineReceiptRequirement(expense: Expense, policy: Policy): ReceiptDecision {
  if (expense.amount <= 0) return { required: false, reason: "INVALID_AMOUNT" };
  if (policy.alwaysRequiredCategories.includes(expense.category)) {
    return { required: true, reason: "ALWAYS_REQUIRED_CATEGORY" };
  }
  if (expense.amount >= policy.defaultThreshold) {
    return { required: true, reason: "ABOVE_DEFAULT_THRESHOLD" };
  }
  return { required: false, reason: "NOT_REQUIRED" };
}
```

**JavaScript solution**

```js
function determineReceiptRequirement(expense, policy) {
  if (expense.amount <= 0) return { required: false, reason: "INVALID_AMOUNT" };
  if (policy.alwaysRequiredCategories.includes(expense.category)) {
    return { required: true, reason: "ALWAYS_REQUIRED_CATEGORY" };
  }
  if (expense.amount >= policy.defaultThreshold) {
    return { required: true, reason: "ABOVE_DEFAULT_THRESHOLD" };
  }
  return { required: false, reason: "NOT_REQUIRED" };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Above threshold",
    "args": [
      {
        "category": "meal",
        "amount": 80
      },
      {
        "defaultThreshold": 75,
        "alwaysRequiredCategories": [
          "hotel"
        ]
      }
    ],
    "expected": {
      "required": true,
      "reason": "ABOVE_DEFAULT_THRESHOLD"
    }
  },
  {
    "name": "Always required category",
    "args": [
      {
        "category": "hotel",
        "amount": 10
      },
      {
        "defaultThreshold": 75,
        "alwaysRequiredCategories": [
          "hotel"
        ]
      }
    ],
    "expected": {
      "required": true,
      "reason": "ALWAYS_REQUIRED_CATEGORY"
    }
  }
]
```

## 6. Calculate Reimbursable Amount with Policy Caps

**Problem statement**

Calculate reimbursable amount after applying category cap and per-day cap, returning non-negative values only.

**Example input**

```json
{
  "expense": {
    "category": "meal",
    "amount": 130,
    "days": 1
  },
  "policy": {
    "categoryCap": {
      "meal": 100
    },
    "dailyCap": 120
  }
}
```

**Expected output**

```json
100
```

**Edge cases**

- Missing category cap should treat as zero
- Negative amount should return zero
- days <= 0 should return zero

**Follow-up requirement changes an interviewer might add**

- Policy cap exceptions by manager override
- Partial reimbursement percentages
- Multi-segment trip with per-day split

**What the interviewer is likely testing**

Numerical policy composition and guarding invalid input.

**TypeScript solution**

```ts
type Expense = { category: string; amount: number; days: number };
type Policy = { categoryCap: Record<string, number>; dailyCap: number };

function calculateReimbursableAmount(expense: Expense, policy: Policy): number {
  if (expense.amount <= 0 || expense.days <= 0) return 0;
  const categoryLimit = policy.categoryCap[expense.category] ?? 0;
  const totalDayLimit = policy.dailyCap * expense.days;
  return Math.max(0, Math.min(expense.amount, categoryLimit, totalDayLimit));
}
```

**JavaScript solution**

```js
function calculateReimbursableAmount(expense, policy) {
  if (expense.amount <= 0 || expense.days <= 0) return 0;
  const categoryLimit = policy.categoryCap[expense.category] ?? 0;
  const totalDayLimit = policy.dailyCap * expense.days;
  return Math.max(0, Math.min(expense.amount, categoryLimit, totalDayLimit));
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Cap by category",
    "args": [
      {
        "category": "meal",
        "amount": 130,
        "days": 1
      },
      {
        "categoryCap": {
          "meal": 100
        },
        "dailyCap": 120
      }
    ],
    "expected": 100
  },
  {
    "name": "Cap by daily limit",
    "args": [
      {
        "category": "meal",
        "amount": 90,
        "days": 1
      },
      {
        "categoryCap": {
          "meal": 200
        },
        "dailyCap": 80
      }
    ],
    "expected": 80
  }
]
```

## 7. Validate an Expense Report with Multiple Items

**Problem statement**

Validate an expense report by checking each item and report-level constraints.

**Example input**

```json
{
  "report": {
    "employeeId": "u1",
    "items": [
      {
        "id": "i1",
        "amount": 50,
        "category": "meal"
      },
      {
        "id": "i2",
        "amount": -5,
        "category": "taxi"
      }
    ],
    "submittedDaysAfterTrip": 5
  }
}
```

**Expected output**

```json
{
  "valid": false,
  "errors": [
    "ITEM_i2_INVALID_AMOUNT"
  ]
}
```

**Edge cases**

- Empty items list
- Any item with invalid amount
- Late report submission

**Follow-up requirement changes an interviewer might add**

- Cross-item duplicate detection in same report
- Max items per report
- Country-specific report policy

**What the interviewer is likely testing**

Combining item-level and aggregate validation with clear error paths.

**TypeScript solution**

```ts
type Item = { id: string; amount: number; category: string };
type Report = { employeeId: string; items: Item[]; submittedDaysAfterTrip: number };
type ReportValidation = { valid: boolean; errors: string[] };

function validateExpenseReport(report: Report): ReportValidation {
  const errors: string[] = [];
  if (report.items.length === 0) errors.push("EMPTY_REPORT");
  if (report.submittedDaysAfterTrip > 30) errors.push("LATE_REPORT_SUBMISSION");

  for (const item of report.items) {
    if (item.amount <= 0) errors.push("ITEM_" + item.id + "_INVALID_AMOUNT");
    if (!item.category) errors.push("ITEM_" + item.id + "_MISSING_CATEGORY");
  }

  return { valid: errors.length === 0, errors };
}
```

**JavaScript solution**

```js
function validateExpenseReport(report) {
  const errors = [];
  if (report.items.length === 0) errors.push("EMPTY_REPORT");
  if (report.submittedDaysAfterTrip > 30) errors.push("LATE_REPORT_SUBMISSION");

  for (const item of report.items) {
    if (item.amount <= 0) errors.push("ITEM_" + item.id + "_INVALID_AMOUNT");
    if (!item.category) errors.push("ITEM_" + item.id + "_MISSING_CATEGORY");
  }

  return { valid: errors.length === 0, errors };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Invalid item amount",
    "args": [
      {
        "employeeId": "u1",
        "items": [
          {
            "id": "i1",
            "amount": -1,
            "category": "meal"
          }
        ],
        "submittedDaysAfterTrip": 5
      }
    ],
    "expected": {
      "valid": false,
      "errors": [
        "ITEM_i1_INVALID_AMOUNT"
      ]
    }
  },
  {
    "name": "Valid report",
    "args": [
      {
        "employeeId": "u1",
        "items": [
          {
            "id": "i1",
            "amount": 10,
            "category": "meal"
          }
        ],
        "submittedDaysAfterTrip": 2
      }
    ],
    "expected": {
      "valid": true,
      "errors": []
    }
  }
]
```

## 8. Handle Policy Exceptions by Role or Department

**Problem statement**

Apply role/department exceptions before default policy check and return which rule was applied.

**Example input**

```json
{
  "expense": {
    "category": "client_meal",
    "amount": 400
  },
  "employee": {
    "role": "MANAGER",
    "department": "Sales"
  },
  "policy": {
    "defaultCap": 150,
    "salesManagerCap": 500
  }
}
```

**Expected output**

```json
{
  "allowed": true,
  "appliedRule": "SALES_MANAGER_EXCEPTION"
}
```

**Edge cases**

- Role matches but department does not
- Amount exactly equals exception cap
- Unknown role falls back to default

**Follow-up requirement changes an interviewer might add**

- Add temporary exceptions by date range
- Allow multiple exception tiers
- Exception audit approvals

**What the interviewer is likely testing**

Precedence of exception rules and explainable decisioning.

**TypeScript solution**

```ts
type Expense = { category: string; amount: number };
type Employee = { role: string; department: string };
type Policy = { defaultCap: number; salesManagerCap: number };
type ExceptionDecision = { allowed: boolean; appliedRule: string };

function applyPolicyExceptions(expense: Expense, employee: Employee, policy: Policy): ExceptionDecision {
  if (employee.role === "MANAGER" && employee.department === "Sales") {
    return {
      allowed: expense.amount <= policy.salesManagerCap,
      appliedRule: "SALES_MANAGER_EXCEPTION"
    };
  }
  return {
    allowed: expense.amount <= policy.defaultCap,
    appliedRule: "DEFAULT_POLICY"
  };
}
```

**JavaScript solution**

```js
function applyPolicyExceptions(expense, employee, policy) {
  if (employee.role === "MANAGER" && employee.department === "Sales") {
    return {
      allowed: expense.amount <= policy.salesManagerCap,
      appliedRule: "SALES_MANAGER_EXCEPTION"
    };
  }
  return {
    allowed: expense.amount <= policy.defaultCap,
    appliedRule: "DEFAULT_POLICY"
  };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Sales manager exception allows",
    "args": [
      {
        "category": "client_meal",
        "amount": 400
      },
      {
        "role": "MANAGER",
        "department": "Sales"
      },
      {
        "defaultCap": 150,
        "salesManagerCap": 500
      }
    ],
    "expected": {
      "allowed": true,
      "appliedRule": "SALES_MANAGER_EXCEPTION"
    }
  },
  {
    "name": "Default cap applies",
    "args": [
      {
        "category": "client_meal",
        "amount": 200
      },
      {
        "role": "IC",
        "department": "Sales"
      },
      {
        "defaultCap": 150,
        "salesManagerCap": 500
      }
    ],
    "expected": {
      "allowed": false,
      "appliedRule": "DEFAULT_POLICY"
    }
  }
]
```

## 9. Support Multi-Currency Expense Validation

**Problem statement**

Convert expense amount to USD using exchange rates and validate against USD policy cap.

**Example input**

```json
{
  "expense": {
    "amount": 100,
    "currency": "EUR",
    "category": "hotel"
  },
  "rates": {
    "EUR": 1.1,
    "GBP": 1.25
  },
  "policy": {
    "usdCapByCategory": {
      "hotel": 120
    }
  }
}
```

**Expected output**

```json
{
  "valid": true,
  "usdAmount": 110,
  "reason": "WITHIN_CAP"
}
```

**Edge cases**

- Missing exchange rate
- Unknown category
- Rounding differences

**Follow-up requirement changes an interviewer might add**

- Use date-specific exchange rates
- Cache stale rates handling
- Allow policy cap in local currency

**What the interviewer is likely testing**

Currency conversion correctness and explicit failure reasons.

**TypeScript solution**

```ts
type Expense = { amount: number; currency: string; category: string };
type Rates = Record<string, number>;
type Policy = { usdCapByCategory: Record<string, number> };
type CurrencyValidation = { valid: boolean; usdAmount: number; reason: string };

function validateMultiCurrencyExpense(expense: Expense, rates: Rates, policy: Policy): CurrencyValidation {
  if (expense.amount <= 0) return { valid: false, usdAmount: 0, reason: "INVALID_AMOUNT" };
  if (!(expense.category in policy.usdCapByCategory)) {
    return { valid: false, usdAmount: 0, reason: "UNKNOWN_CATEGORY" };
  }

  let usdAmount = expense.amount;
  if (expense.currency !== "USD") {
    if (!(expense.currency in rates)) return { valid: false, usdAmount: 0, reason: "MISSING_EXCHANGE_RATE" };
    usdAmount = Number((expense.amount * rates[expense.currency]).toFixed(2));
  }

  const cap = policy.usdCapByCategory[expense.category];
  return usdAmount <= cap
    ? { valid: true, usdAmount, reason: "WITHIN_CAP" }
    : { valid: false, usdAmount, reason: "EXCEEDS_USD_CAP" };
}
```

**JavaScript solution**

```js
function validateMultiCurrencyExpense(expense, rates, policy) {
  if (expense.amount <= 0) return { valid: false, usdAmount: 0, reason: "INVALID_AMOUNT" };
  if (!(expense.category in policy.usdCapByCategory)) {
    return { valid: false, usdAmount: 0, reason: "UNKNOWN_CATEGORY" };
  }

  let usdAmount = expense.amount;
  if (expense.currency !== "USD") {
    if (!(expense.currency in rates)) return { valid: false, usdAmount: 0, reason: "MISSING_EXCHANGE_RATE" };
    usdAmount = Number((expense.amount * rates[expense.currency]).toFixed(2));
  }

  const cap = policy.usdCapByCategory[expense.category];
  return usdAmount <= cap
    ? { valid: true, usdAmount, reason: "WITHIN_CAP" }
    : { valid: false, usdAmount, reason: "EXCEEDS_USD_CAP" };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Within cap after conversion",
    "args": [
      {
        "amount": 100,
        "currency": "EUR",
        "category": "hotel"
      },
      {
        "EUR": 1.1,
        "GBP": 1.25
      },
      {
        "usdCapByCategory": {
          "hotel": 120
        }
      }
    ],
    "expected": {
      "valid": true,
      "usdAmount": 110,
      "reason": "WITHIN_CAP"
    }
  },
  {
    "name": "Missing rate",
    "args": [
      {
        "amount": 100,
        "currency": "JPY",
        "category": "hotel"
      },
      {
        "EUR": 1.1
      },
      {
        "usdCapByCategory": {
          "hotel": 120
        }
      }
    ],
    "expected": {
      "valid": false,
      "usdAmount": 0,
      "reason": "MISSING_EXCHANGE_RATE"
    }
  }
]
```

## 10. Return Audit-Friendly Explanations for Decisions

**Problem statement**

Return approval decision and an ordered list of explanation statements suitable for audit logs.

**Example input**

```json
{
  "expense": {
    "amount": 90,
    "category": "meal",
    "hasReceipt": false
  },
  "policy": {
    "receiptRequiredOver": 75,
    "capByCategory": {
      "meal": 100
    }
  },
  "employee": {
    "role": "IC"
  }
}
```

**Expected output**

```json
{
  "decision": "REJECTED",
  "explanations": [
    "Category cap for meal is 100",
    "Receipt required over 75",
    "Rejected: receipt missing"
  ]
}
```

**Edge cases**

- Must preserve deterministic explanation order
- Unknown category explanation
- Manager override explanation

**Follow-up requirement changes an interviewer might add**

- Include policy version in explanation
- Localize explanation messages
- Structured machine-readable reason codes with text

**What the interviewer is likely testing**

Explainability, deterministic outputs, and communication-oriented API design.

**TypeScript solution**

```ts
type Expense = { amount: number; category: string; hasReceipt: boolean };
type Policy = { receiptRequiredOver: number; capByCategory: Record<string, number> };
type Employee = { role: string };
type DecisionResult = { decision: string; explanations: string[] };

function explainExpenseDecision(expense: Expense, policy: Policy, employee: Employee): DecisionResult {
  const explanations: string[] = [];
  const cap = policy.capByCategory[expense.category];

  if (cap === undefined) {
    explanations.push("Category " + expense.category + " is not configured");
    explanations.push("Rejected: unknown category");
    return { decision: "REJECTED", explanations };
  }

  explanations.push("Category cap for " + expense.category + " is " + cap);
  explanations.push("Receipt required over " + policy.receiptRequiredOver);

  if (expense.amount > cap) {
    explanations.push("Rejected: amount exceeds category cap");
    return { decision: "REJECTED", explanations };
  }
  if (expense.amount > policy.receiptRequiredOver && !expense.hasReceipt) {
    explanations.push("Rejected: receipt missing");
    return { decision: "REJECTED", explanations };
  }
  if (employee.role === "MANAGER") {
    explanations.push("Approved: manager role allows direct approval");
    return { decision: "APPROVED", explanations };
  }

  explanations.push("Approved: policy conditions satisfied");
  return { decision: "APPROVED", explanations };
}
```

**JavaScript solution**

```js
function explainExpenseDecision(expense, policy, employee) {
  const explanations = [];
  const cap = policy.capByCategory[expense.category];

  if (cap === undefined) {
    explanations.push("Category " + expense.category + " is not configured");
    explanations.push("Rejected: unknown category");
    return { decision: "REJECTED", explanations };
  }

  explanations.push("Category cap for " + expense.category + " is " + cap);
  explanations.push("Receipt required over " + policy.receiptRequiredOver);

  if (expense.amount > cap) {
    explanations.push("Rejected: amount exceeds category cap");
    return { decision: "REJECTED", explanations };
  }
  if (expense.amount > policy.receiptRequiredOver && !expense.hasReceipt) {
    explanations.push("Rejected: receipt missing");
    return { decision: "REJECTED", explanations };
  }
  if (employee.role === "MANAGER") {
    explanations.push("Approved: manager role allows direct approval");
    return { decision: "APPROVED", explanations };
  }

  explanations.push("Approved: policy conditions satisfied");
  return { decision: "APPROVED", explanations };
}
```

**Verification examples used in app**

```json
[
  {
    "name": "Reject with audit explanations",
    "args": [
      {
        "amount": 90,
        "category": "meal",
        "hasReceipt": false
      },
      {
        "receiptRequiredOver": 75,
        "capByCategory": {
          "meal": 100
        }
      },
      {
        "role": "IC"
      }
    ],
    "expected": {
      "decision": "REJECTED",
      "explanations": [
        "Category cap for meal is 100",
        "Receipt required over 75",
        "Rejected: receipt missing"
      ]
    }
  },
  {
    "name": "Approve with deterministic explanation",
    "args": [
      {
        "amount": 50,
        "category": "meal",
        "hasReceipt": false
      },
      {
        "receiptRequiredOver": 75,
        "capByCategory": {
          "meal": 100
        }
      },
      {
        "role": "IC"
      }
    ],
    "expected": {
      "decision": "APPROVED",
      "explanations": [
        "Category cap for meal is 100",
        "Receipt required over 75",
        "Approved: policy conditions satisfied"
      ]
    }
  }
]
```

