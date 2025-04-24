import Image from "next/image";
import Link from "next/link";

const BannerPromo = () => {
  return (
    <section className="my-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Left Banner */}
        <div className="flex items-center bg-[#F5F5F5] p-6 rounded-md">
          <div className="w-1/2">
            <Image
              src="/cactus.png"
              alt="Summer Cactus"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-lg font-semibold mb-2">
              SUMMER CACTUS & SUCCULENTS
            </h3>
            <p className="text-sm mb-4">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#46A358] text-white px-4 py-2 rounded hover:bg-green-700 transition text-decoration-none"
            >
              Find More →
            </Link>
          </div>
        </div>

        {/* Right Banner */}
        <div className="flex items-center bg-[#F5F5F5] p-6 rounded-md">
          <div className="w-1/2">
            <Image
              src="/trendy.png"
              alt="Styling Trends"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-lg font-semibold mb-2">
              STYLING TRENDS & MUCH MORE
            </h3>
            <p className="text-sm mb-4">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#46A358] text-white px-4 py-2 rounded hover:bg-green-700 transition text-decoration-none"
            >
              Find More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerPromo;
