# Auth Feature

This folder is a small frontend auth layer for the signup/login flow.

## What to connect
- `authApi.js` sends requests to the backend.
- `useAuthForm.js` tracks input state with `useState`.
- `authMapper.js` turns screen state into the backend payload.

## Backend endpoint currently available
- `POST /api/auth/register`

## Suggested wiring order
1. Keep screen UI in `src/screens/auth/`.
2. Use `useAuthForm()` inside the signup/login screens.
3. Call `registerUser(toRegisterPayload(form))` on submit.
4. Show `error` from the hook in the screen.
5. Add login API only after the backend route exists.

## Example usage
```js
const { form, setField, loading, error } = useAuthForm();

// setField('phone', value)
// registerUser(toRegisterPayload(form))
```

## Note
`loginUser()` is only a placeholder for now because the backend does not expose a login route yet.
