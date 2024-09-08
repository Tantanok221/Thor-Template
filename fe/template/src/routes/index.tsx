import { RPCClient } from "@/main";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["keys"],
    queryFn: async () => {
      const res = await RPCClient.users.$get({});
      const data = await res.json();
      return data;
    },
  });
  console.log(data)
  return (
    <div className="">
      <h3>User List</h3>
      <div></div>
    </div>
  );
}
