import RouterApp from "./routes/index.route"
import { AuthProvider } from "./features/auth";
export default function App() {

  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  )
}