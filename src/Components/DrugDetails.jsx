import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DrugDetails = () => {
  const { id } = useParams();
  const [DrugDetails, setDrugDetails] = useState(null);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/rxcui/${id}/properties.json`
        );
        setDrugDetails(response.data.properties);
      } catch (error) {
        console.error("Error Fetching drug Details :", error);
      }
    };
    fetchDrugDetails();
  }, [id]);

  if (!DrugDetails) {
    return (
      <div className="text-center mt-12 text-lg font-medium">
        Loading Right Now....
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-centre justify-centre bg-gray-100 py-12">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg space-y-4">
          <h2>{DrugDetails.name}</h2>
          <div className="text-lg space-y-3">
            <p>
              <span className="font-semibold text-blue-700">RXCUI ID : </span>{" "}
              {DrugDetails.rxcui}
            </p>
            <p>
              <span className="font-semibold text-blue-700">
                Drugs Synonym:{" "}
              </span>{" "}
              {DrugDetails.synonym}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DrugDetails;
