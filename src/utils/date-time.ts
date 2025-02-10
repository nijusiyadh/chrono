type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const toUTCFormat = (value: Value): string => {
  if (value instanceof Date) {
    return value.toISOString();
  } else if (Array.isArray(value)) {
    const start = value[0] instanceof Date ? value[0].toISOString() : 'null';
    const end = value[1] instanceof Date ? value[1].toISOString() : 'null';
    return `Start: ${start}, End: ${end}`;
  }
  return 'No date selected';
};
