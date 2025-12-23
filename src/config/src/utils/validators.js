const VALID_CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];

const validateExpenseInput = (data) => {
  const errors = [];
  if (data.amount === undefined || data.amount === null) {
    errors.push('Amount is required');
  } else if (typeof data.amount !== 'number' || data.amount <= 0) {
    errors.push('Amount must be a positive number');
  }
  if (!data.category) {
    errors.push('Category is required');
  } else if (!VALID_CATEGORIES.includes(data.category)) {
    errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }
  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push('Date must be a valid date format');
  }
  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }
  return { isValid: errors.length === 0, errors };
};

const validateFilterParams = (query) => {
  const errors = [];
  if (query.start_date && isNaN(Date.parse(query.start_date))) {
    errors.push('start_date must be a valid date format');
  }
  if (query.end_date && isNaN(Date.parse(query.end_date))) {
    errors.push('end_date must be a valid date format');
  }
  if (query.min_amount && (isNaN(query.min_amount) || parseFloat(query.min_amount) < 0)) {
    errors.push('min_amount must be a non-negative number');
  }
  if (query.max_amount && (isNaN(query.max_amount) || parseFloat(query.max_amount) < 0)) {
    errors.push('max_amount must be a non-negative number');
  }
  if (query.category && !VALID_CATEGORIES.includes(query.category)) {
    errors.push(`Category must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }
  if (query.sort_by && !['date', 'amount'].includes(query.sort_by)) {
    errors.push('sort_by must be date or amount');
  }
  if (query.order && !['asc', 'desc'].includes(query.order)) {
    errors.push('order must be asc or desc');
  }
  return { isValid: errors.length === 0, errors };
};

module.exports = { validateExpenseInput, validateFilterParams, VALID_CATEGORIES };
