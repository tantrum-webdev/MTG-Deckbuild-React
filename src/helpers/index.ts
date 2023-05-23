type CommonDataTypes = string | unknown[] | Record<string, unknown>;

export function isEmpty(value: CommonDataTypes): boolean {
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }

  return Object.keys(value).length === 0;
}

export function isNil(value: unknown) {
  return value === null || value === undefined;
}
