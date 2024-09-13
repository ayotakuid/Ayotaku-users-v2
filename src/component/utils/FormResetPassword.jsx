import { Button } from "primereact/button"
import { toast } from "sonner"

function FormResetPassword() {
  return (
    <>
      <div className="grid grid-cols-1 text-lg">
        Form Change Password
      </div>

      <div className="grid grid-cols-1">
        <label htmlFor="New Password" className="text-ayotaku-text-sm mt-4 mb-1">New Password</label>
        <input 
          type="password"
          placeholder="New Password..."
          name="displayUsername"
          className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-0.5 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
        />
      </div>

      <div className="grid grid-cols-1">
        <label htmlFor="Confirm Password" className="text-ayotaku-text-sm mt-4 mb-1">Confirm Password</label>
        <input 
          type="password"
          placeholder="Confirm Password..."
          name="displayUsername"
          className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-0.5 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
        />
      </div>

      <div className="grid grid-cols-1">
        <Button 
          label="Confirm"
          className="dark:bg-ayotaku-button w-16 dark:text-gray-900 text-ayotaku-text-sm px-2 py-1.5 mt-2 hover:dark:bg-ayotaku-normal-dark duration-500 focus:outline-none focus:shadow-none"
          size="sm"
          severity="none"
          onClick={() => {
            toast.success('Berhasil dikirim!')
          }}
        />
      </div>
    </>
  )
}

export default FormResetPassword;