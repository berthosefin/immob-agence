import { PropertyCard } from "@/components/properties/card";
import { getProperties } from "@/lib/actions";

export default async function Home() {
  const lastProperties = await getProperties({ limit: 4 });

  return (
    <>
      <div className="p-5 mb-5 text-center">
        <div className="container">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
            Immob Agence
          </h1>
          <p className="text-justify mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            sequi repellendus dolorum ea doloremque totam maiores officiis nisi
            voluptates quisquam, esse, maxime nihil consectetur culpa deleniti
            laborum, dicta nulla quos! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Deserunt voluptate optio molestias assumenda rerum
            repellat recusandae quia amet ad eligendi, veniam eaque soluta
            laudantium quo ratione nostrum? Asperiores, numquam dolore!
          </p>
        </div>
      </div>

      <div className="container">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Nos derniers biens
        </h2>
        <div className="flex flex-wrap">
          {lastProperties && lastProperties.length > 0 ? (
            lastProperties?.map((property) => (
              <div
                key={property.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                <PropertyCard property={property} />
              </div>
            ))
          ) : (
            <p className="text-center mx-auto my-4 text-gray-400">
              Aucun nouveau bien enregistré pour l&apos;instant.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
