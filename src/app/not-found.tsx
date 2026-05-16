import { LinkBtn } from "@/components/shared/buttons/LinkBtn";
import { OuterContainer } from "@/components/shared/containers/OuterContainer";

export default function NotFound() {
  return (
    <OuterContainer>
      <section className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="font-semibold text-2xl mb-2!">Under Development</h2>
        <p className="mb-4!">This page is currently being developed.</p>

        <LinkBtn className="primary-classes">Return Home</LinkBtn>
      </section>
    </OuterContainer>
  );
}
