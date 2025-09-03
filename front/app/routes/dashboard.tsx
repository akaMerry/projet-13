import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { updateUser, useAppDispatch, useAppSelector } from "~/store";

function Account({
  account,
  balance,
  description,
}: {
  account: string;
  balance: string;
  description: string;
}) {
  return (
    <section className="account flex flex-row justify-between items-center w-4/5 text-left text-gray-700 bg-white border border-gray-700 box-border mt-auto mb-auto p-6">
      <div className="w-full flex-1">
        <h2 className="m-0 p-0 text-base font-normal">{account}</h2>
        <p className="m-0 text-4xl font-bold">{balance}</p>
        <p className="m-0">{description}</p>
      </div>
      <div>
        <button className="block w-full p-2 text-lg text-white mt-4 bg-emerald-500 border-2 border-l-emerald-400 border-t-emerald-400 border-r-emerald-800 border-b-emerald-800 active:border-l-emerald-800 active:border-t-emerald-800 active:border-r-emerald-400 active:border-b-emerald-400">
          View transactions
        </button>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);

  useEffect(() => {
    if (user.user?.firstName) setFirstName(user.user.firstName);
    if (user.user?.lastName) setLastName(user.user.lastName);
  }, [user.user?.firstName, user.user?.lastName]);

  const editUser = () => {
    if (isEditing === false) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement)
    ) as {
      firstName: string;
      lastName: string;
    };

    dispatch(updateUser(formData));

    setIsEditing(false);
  };

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/login");
    }
  }, [user.isAuthenticated, navigate]);

  return (
    <section className="flex flex-col min-w-full min-h-full items-center bg-slate-200 dark:bg-[#12002b]">
      <div className="mt-5 mb-5 text-center dark:text-white text-gray-700 font-bold">
        <h1 className="text-3xl dark:text-white text-gray-700">Welcome back</h1>

        {isEditing ? (
          <>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 mt-4"
            >
              <div className="flex flex-col items-end">
                <input
                  className="border border-gray-700 p-2 rounded-sm "
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></input>
                <button
                  type="submit"
                  className="w-30 mt-4 text-sm text-white p-2 bg-emerald-500 border-2 border-l-emerald-400 border-t-emerald-400 border-r-emerald-800 border-b-emerald-800 active:border-l-emerald-800 active:border-t-emerald-800 active:border-r-emerald-400 active:border-b-emerald-400"
                >
                  <p>Save</p>
                </button>
              </div>
              <div className="flex flex-col">
                <input
                  className="border border-gray-700 p-2 rounded-sm"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
                <button
                  onClick={() => editUser()}
                  type="button"
                  className="w-30 mt-4 text-sm text-white p-2 bg-emerald-500 border-2 border-l-emerald-400 border-t-emerald-400 border-r-emerald-800 border-b-emerald-800 active:border-l-emerald-800 active:border-t-emerald-800 active:border-r-emerald-400 active:border-b-emerald-400"
                >
                  <p>Cancel</p>
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl dark:text-white text-gray-700">
              {user.user.firstName} {user.user.lastName} !
            </h1>
            <button
              onClick={() => editUser()}
              type="button"
              className="mt-5 text-sm text-white p-2 bg-emerald-500 border-2 border-l-emerald-400 border-t-emerald-400 border-r-emerald-800 border-b-emerald-800 active:border-l-emerald-800 active:border-t-emerald-800 active:border-r-emerald-400 active:border-b-emerald-400"
            >
              Edit Name
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 auto-rows w-full justify-items-center gap-20 mt-5">
        <Account
          account="Argent Bank Checking (x8349)"
          balance="$2,082.79"
          description="Available Balance"
        />
        <Account
          account="Argent Bank Savings (x6712)"
          balance="$10,928.42"
          description="Available Balance"
        />
        <Account
          account="Argent Bank Credit Card (x8349)"
          balance="$184.30"
          description="Current Balance"
        />
      </div>
    </section>
  );
}
