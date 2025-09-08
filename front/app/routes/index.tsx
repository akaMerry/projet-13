import bgImage from "~/assets/bank-tree.jpeg";
import iconChat from "~/assets/icon-chat.png";
import iconMoney from "~/assets/icon-money.png";
import iconSecurity from "~/assets/icon-security.png";

function Feature({
  imgsrc,
  title,
  content,
}: {
  imgsrc: string;
  title: string;
  content: string;
}) {
  return (
    <div className="flex flex-col w-fit max-w-150 items-center justify-center">
      <div className="flex h-38 w-38 rounded-full  border-10 border-emerald-500 items-center justify-center">
        <img className="max-w-25 rounded-full" src={imgsrc}></img>
      </div>
      <h1 className="text-xl font-semibold text-center  m-4">{title}</h1>
      <p className="text-md text-base/4  md:text-base/5 text-center text-gray-700 ">
        {content}
      </p>
    </div>
  );
}

export default function Index() {
  return (
    <div className="flex flex-col min-w-full min-h-full justify-center">
      <section className="hero-content w-full h-fit">
        <div className="flex items-center justify-center">
          <div className="flex relative h-68 md:h-100 w-full items-center justify-center">
            <img
              className="absolute object-cover object-center max-h-68 md:max-h-100 w-full"
              src={bgImage}
            />
            <div
              className="static md:absolute z-10 md:top-20 md:right-20 h-40 md:h-53 w-62 md:w-100 bg-white items-center p-8"
              aria-label="Promoted content"
            >
              <p className="text-base/4 md:text-xl font-bold text-gray-700">
                No fees.
              </p>
              <p className="text-base/4 md:text-xl font-bold text-gray-700">
                No minimum deposit.
              </p>
              <p className="text-base/4 md:text-xl font-bold text-gray-700">
                High interest rates.
              </p>
              <p className="pt-3 text-sm/5 md:pr-15 md:text-lg/5 font-normal text-gray-700">
                Open a savings account with Argent Bank today!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="features w-full h-full ">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-20 pt-15 ml-8 mr-8 mb-15 md:m-8">
          <Feature
            imgsrc={iconChat}
            title="You are our #1 priority"
            content="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."
          />
          <Feature
            imgsrc={iconMoney}
            title="More savings means higher rates"
            content="The more you save with us, the higher your interest rate will be!"
          />
          <Feature
            imgsrc={iconSecurity}
            title="Security you can trust"
            content="We use top of the line encryption to make sure your data and money
            is always safe."
          />
        </div>
      </section>
    </div>
  );
}
