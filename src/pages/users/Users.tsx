import UsersTabs from "../../components/users/UsersTabs";

export default function Users() {
  return (
    <div className="Users">
      <div className="">
        <div className="">
          <input type="text" />
        </div>
        <button>Filter</button>
      </div>
      <UsersTabs />
    </div>
  );
}
