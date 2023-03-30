export type BannerData = {
  message: string;
  state: "success" | "error";

};
export default function SuccessBanner({
  banner: { message, state }
}: {
  banner: BannerData;
}) {
  const isSuccess = state === "success";
  const icon = isSuccess ? "📧" : "❌";
  return <p>{`${icon} ${message}`}</p>;
}
