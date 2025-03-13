type MaskType = 'letters' | 'numbers' | 'both';

const applyMask = (
  value: string | number,
  mask: string,
  maskType: MaskType = 'numbers',
): string => {
  if (!value) return '';

  let regex;

  switch (maskType) {
    case 'letters':
      regex = /[^a-zA-Z]+/g;
      break;
    case 'numbers':
      regex = /\D+/g;
      break;
    case 'both':
    default:
      regex = /[^a-zA-Z0-9]+/g;
      break;
  }

  let formattedValue = '';
  const unmaskedValue = String(value).replace(regex, '');
  let position = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '*' && unmaskedValue[position] !== undefined) {
      formattedValue += unmaskedValue[position++];
    } else if (unmaskedValue[position] !== undefined) {
      formattedValue += mask[i];
    }
  }

  return formattedValue;
};

const formatDate = (value: string, maskType: MaskType) => applyMask(value, '**/**/****', maskType);

const code = (value: string, maskType: MaskType) => applyMask(value, '******', maskType);

const financialMask = (fieldValue: string) => {
  const value = fieldValue.replace('.', '').replace(',', '').replace(/\D/g, '');

  if (isNaN(parseFloat(value))) {
    return value;
  }

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100);

  return 'R$ ' + result;
};

const hourMask = (value: string) => {
  value = value.replace(/\D/g, '');

  if (value.length > 0) {
    value = value + 'h';
  }

  return value;
};

const numberMask = (value: string) => {
  value = value.replace(/\D/g, '');
  return value;
};

export const Mask = {
  number: (value: string): string => numberMask(value),
  hour: (value: string): string => hourMask(value),
  currency: (value: string): string => financialMask(value),
  date: (value: string, maskType: MaskType = 'numbers') => formatDate(value, maskType),
  code: (value: string, maskType: MaskType = 'numbers') => code(value, maskType),
};
