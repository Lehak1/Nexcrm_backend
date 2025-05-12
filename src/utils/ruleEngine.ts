interface Condition {
  field: string;
  operator: "$eq" | "$gt" | "$lt" | "$gte" | "$lte" | string; // allow raw operators too
  value: any;
}

export function applySegmentRules(
  customer: Record<string, any>,
  rules: Condition[],
  combinator: "AND" | "OR"
): boolean {
  const operatorMap: Record<string, "$eq" | "$gt" | "$lt" | "$gte" | "$lte"> = {
    "=": "$eq",
    ">": "$gt",
    "<": "$lt",
    ">=": "$gte",
    "<=": "$lte",
  };

  const normalizedRules = rules.map(rule => ({
    ...rule,
    operator: operatorMap[rule.operator] || rule.operator,
  }));

  const evaluateCondition = (condition: Condition): boolean => {
    const fieldValue = customer[condition.field];
    if (fieldValue === undefined || fieldValue === null) return false;

    const { operator, value } = condition;

    const parsedValue = (() => {
      if (fieldValue instanceof Date || !isNaN(Date.parse(value))) {
        return new Date(value);
      }
      if (typeof fieldValue === "number") {
        return Number(value);
      }
      return value;
    })();

    switch (operator) {
      case "$eq":
        return fieldValue === parsedValue;
      case "$gt":
        return fieldValue > parsedValue;
      case "$lt":
        return fieldValue < parsedValue;
      case "$gte":
        return fieldValue >= parsedValue;
      case "$lte":
        return fieldValue <= parsedValue;
      default:
        return false;
    }
  };

  const results = normalizedRules.map(evaluateCondition);

  return combinator === "AND"
    ? results.every(Boolean)
    : results.some(Boolean);
}
