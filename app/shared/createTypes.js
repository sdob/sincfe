/*
 * Given a 'prefix' string, generate an object containing success,
 * failure, and pending types, in the format that createApiAction()
 * expects.
 */
export default function createTypes(prefix) {
  return {
    success: `${prefix}_SUCCESS`,
    pending: `${prefix}_PENDING`,
    error: `${prefix}_ERROR`,
  };
}
