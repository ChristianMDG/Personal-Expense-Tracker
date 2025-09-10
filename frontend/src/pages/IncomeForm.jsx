// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { incomesAPI } from "../services";


// const IncomeForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);

//   const [formData, setFormData] = useState({
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     source: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     if (isEdit) {
//       fetchIncome();
//     }
//   }, [id]);

//   const fetchIncome = async () => {
//     try {
//       setLoading(true);
//       const response = await incomesAPI.getById(id);
//       const income = response.data;
//       setFormData({
//         amount: income.amount.toString(),
//         date: new Date(income.date).toISOString().split("T")[0],
//         source: income.source || "",
//         description: income.description || "",
//       });
//     } catch (error) {
//       setError("Failed to fetch income details");
//       console.error("Fetch income error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     // Validation
//     if (!formData.amount || !formData.date) {
//       setError("Amount and date are required");
//       setLoading(false);
//       return;
//     }

//     if (parseFloat(formData.amount) <= 0) {
//       setError("Amount must be greater than 0");
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         amount: parseFloat(formData.amount),
//       };

//       if (isEdit) {
//         await incomesAPI.update(id, payload);
//         setSuccess("Income updated successfully!");
//       } else {
//         await incomesAPI.create(payload);
//         setSuccess("Income created successfully!");
//       }

//       // Redirection après un court délai pour montrer le message de succès
//       setTimeout(() => {
//         navigate("/incomes");
//       }, 1500);
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error || "Failed to save income";
//       setError(errorMessage);
//       console.error("Save income error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Formattage de la monnaie
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("fr-MG", {
//       style: "currency",
//       currency: "MGA",
//     }).format(amount);
//   };


//   // Affichage du loader pendant le chargement des données en mode édition
//   if (loading && isEdit) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"
//         />
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-2xl mx-auto">
//         <div
//           className="mb-8"
//         >
//           <div
//             className="flex items-center mb-4"
//           >
//             <button
//             onClick={() => navigate("/incomes")}
//               className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//             </button>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {isEdit ? "Edit Income" : "Add New Income"}
//             </h1>
//           </div>
//           <p  className="text-gray-600 ml-11">
//             {isEdit
//               ? "Update your income details"
//               : "Add a new income source to track your earnings"}
//           </p>
//         </div>

//         {/* Alerts */}
//         <div
//         >
//           {error && (
//             <div
//               className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
//             >
//               <div className="flex items-center">
//                 <svg
//                   className="w-5 h-5 text-red-600 mr-2"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span className="text-red-800">{error}</span>
//               </div>
//             </div>
//           )}

//           {success && (
//             <div
//               className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
//             >
//               <div className="flex items-center">
//                 <svg
//                   className="w-5 h-5 text-[var(--primary-color)] mr-2"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span className="text-green-800">{success}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form Card */}
//         <div
          
//           className="bg-white rounded-lg shadow-lg p-6"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Amount Field */}
//             <div>
//               <label
//                 htmlFor="amount"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Amount *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <span className="text-gray-500">$</span>
//                 </div>
//                 <input
//                   id="amount"
//                   name="amount"
//                   type="number"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   step="0.01"
//                   min="0"
//                   required
//                   className="pl-8 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition-colors outline-none"
//                   placeholder="0.00"
//                   disabled={loading}
//                 />
//               </div>
//               {formData.amount && (
//                 <p
//                   className="mt-1 text-sm text-gray-500"
//                 >
//                   {formatCurrency(parseFloat(formData.amount) || 0)}
//                 </p>
//               )}
//             </div>

//             {/* Date Field */}
//             <div>
//               <label
//                 htmlFor="date"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Date *
//               </label>
//               <input
//                 id="date"
//                 name="date"
//                 type="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition-colors outline-none"
//                 disabled={loading}
//               />
//             </div>

//             {/* Source Field */}
//             <div>
//               <label
//                 htmlFor="source"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Source
//               </label>
//               <select
//                 id="source"
//                 name="source"
//                 value={formData.source}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition-colors outline-none"
//                 disabled={loading}
//               >
//                 <option value="">Select a source</option>
//                 <option value="Salary">Salary</option>
//                 <option value="Freelance">Freelance</option>
//                 <option value="Investment">Investment</option>
//                 <option value="Business">Business</option>
//                 <option value="Rental">Rental Income</option>
//                 <option value="Bonus">Bonus</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Description Field */}
//             <div>
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent transition-colors outline-none"
//                 placeholder="Additional details about this income (optional)"
//                 disabled={loading}
//               />
//             </div>

//             {/* Form Actions */}
//             <div
//               className="flex flex-col sm:flex-row gap-3 pt-4"
//             >
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     {isEdit ? "Updating..." : "Creating..."}
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                     {isEdit ? "Update Income" : "Create Income"}
//                   </div>
//                 )}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => navigate("/incomes")}
//                 disabled={loading}
//                 className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncomeForm;


// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { incomesAPI } from "../services";
// import { ArrowLeft, XCircle, CheckCircle2, Loader2 } from "lucide-react";

// // --- Utils ---
// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("fr-MG", {
//     style: "currency",
//     currency: "MGA",
//   }).format(amount);

// // --- Reusable Components ---
// const Alert = ({ type, message }) => {
//   if (!message) return null;

//   const isError = type === "error";
//   const styles = isError
//     ? "bg-red-50 border border-red-200 text-red-800"
//     : "bg-green-50 border border-green-200 text-green-800";

//   const Icon = isError ? XCircle : CheckCircle2;
//   const iconColor = isError ? "text-red-600" : "text-green-600";

//   return (
//     <div className={`mb-6 rounded-lg p-4 flex items-center ${styles}`}>
//       <Icon className={`w-5 h-5 mr-2 ${iconColor}`} />
//       <span>{message}</span>
//     </div>
//   );
// };

// const Loader = () => (
//   <Loader2 className="animate-spin h-5 w-5 text-white mr-2" />
// );

// const IncomeForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = Boolean(id);

//   const [formData, setFormData] = useState({
//     amount: "",
//     date: new Date().toISOString().split("T")[0],
//     source: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [alerts, setAlerts] = useState({ error: "", success: "" });

//   // --- Fetch data when editing ---
//   useEffect(() => {
//     if (!isEdit) return;
//     const fetchIncome = async () => {
//       try {
//         setLoading(true);
//         const { data } = await incomesAPI.getById(id);
//         setFormData({
//           amount: data.amount.toString(),
//           date: new Date(data.date).toISOString().split("T")[0],
//           source: data.source || "",
//           description: data.description || "",
//         });
//       } catch {
//         setAlerts({ error: "Failed to fetch income details", success: "" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIncome();
//   }, [id, isEdit]);

//   // --- Handle form changes ---
//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   // --- Submit handler ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setAlerts({ error: "", success: "" });

//     const { amount, date } = formData;
//     if (!amount || !date) {
//       setAlerts({ error: "Amount and date are required", success: "" });
//       setLoading(false);
//       return;
//     }
//     if (parseFloat(amount) <= 0) {
//       setAlerts({ error: "Amount must be greater than 0", success: "" });
//       setLoading(false);
//       return;
//     }

//     try {
//       const payload = { ...formData, amount: parseFloat(amount) };
//       if (isEdit) {
//         await incomesAPI.update(id, payload);
//         setAlerts({ error: "", success: "Income updated successfully!" });
//       } else {
//         await incomesAPI.create(payload);
//         setAlerts({ error: "", success: "Income created successfully!" });
//       }
//       setTimeout(() => navigate("/incomes"), 1500);
//     } catch (err) {
//       setAlerts({
//         error: err.response?.data?.error || "Failed to save income",
//         success: "",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Loader for fetch ---
//   if (loading && isEdit) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin h-12 w-12 text-[var(--primary-color)]" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
//             <button
//               onClick={() => navigate("/incomes")}
//               className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
//             >
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-3xl font-bold text-gray-900">
//               {isEdit ? "Edit Income" : "Add New Income"}
//             </h1>
//           </div>
//           <p className="text-gray-600 ml-11">
//             {isEdit
//               ? "Update your income details"
//               : "Add a new income source to track your earnings"}
//           </p>
//         </div>

//         {/* Alerts */}
//         <Alert type="error" message={alerts.error} />
//         <Alert type="success" message={alerts.success} />

//         {/* Form */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Amount */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Amount *
//               </label>
//               <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 value={formData.amount}
//                 onChange={handleChange}
//                 step="0.01"
//                 min="0"
//                 required
//                 className="pl-3 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none"
//                 placeholder="0.00"
//                 disabled={loading}
//               />
//               {formData.amount && (
//                 <p className="mt-1 text-sm text-gray-500">
//                   {formatCurrency(parseFloat(formData.amount) || 0)}
//                 </p>
//               )}
//             </div>

//             {/* Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date *
//               </label>
//               <input
//                 id="date"
//                 name="date"
//                 type="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none"
//               />
//             </div>

//             {/* Source */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Source
//               </label>
//               <select
//                 id="source"
//                 name="source"
//                 value={formData.source}
//                 onChange={handleChange}
//                 disabled={loading}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none"
//               >
//                 <option value="">Select a source</option>
//                 {[
//                   "Salary",
//                   "Freelance",
//                   "Investment",
//                   "Business",
//                   "Rental",
//                   "Bonus",
//                   "Other",
//                 ].map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={4}
//                 disabled={loading}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent outline-none"
//                 placeholder="Additional details about this income (optional)"
//               />
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 flex items-center justify-center bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)] disabled:opacity-50"
//               >
//                 {loading ? <Loader /> : isEdit ? "Update Income" : "Create Income"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate("/incomes")}
//                 disabled={loading}
//                 className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncomeForm;



import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { incomesAPI } from "../services";
import { ArrowLeft, XCircle, CheckCircle2, Loader2 } from "lucide-react";

// --- Utils ---
const formatCurrency = (amount) =>
  new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
  }).format(amount);

const Alert = ({ type, message }) => {
  if (!message) return null;

  const isError = type === "error";
  const Icon = isError ? XCircle : CheckCircle2;

  return (
    <div
      className={`mb-6 flex items-center rounded-lg p-4 ${
        isError
          ? "bg-red-50 border border-red-200 text-red-800"
          : "bg-green-50 border border-green-200 text-green-800"
      }`}
    >
      <Icon className={`w-5 h-5 mr-2 ${isError ? "text-red-600" : "text-green-600"}`} />
      <span>{message}</span>
    </div>
  );
};

const Loader = () => <Loader2 className="animate-spin h-5 w-5 text-white mr-2" />;

const IncomeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    source: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState({ error: "", success: "" });

  // --- Fetch data when editing ---
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        setLoading(true);
        const { data } = await incomesAPI.getById(id);
        setFormData({
          amount: data.amount.toString(),
          date: new Date(data.date).toISOString().split("T")[0],
          source: data.source || "",
          description: data.description || "",
        });
      } catch {
        setAlerts({ error: "Failed to fetch income details", success: "" });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!formData.amount || !formData.date) return "Amount and date are required";
    if (parseFloat(formData.amount) <= 0) return "Amount must be greater than 0";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerts({ error: "", success: "" });

    const error = validateForm();
    if (error) return setAlerts({ error, success: "" });

    setLoading(true);
    try {
      const payload = { ...formData, amount: parseFloat(formData.amount) };
      if (isEdit) {
        await incomesAPI.update(id, payload);
        setAlerts({ success: "Income updated successfully!", error: "" });
      } else {
        await incomesAPI.create(payload);
        setAlerts({ success: "Income created successfully!", error: "" });
      }
      setTimeout(() => navigate("/incomes"), 1500);
    } catch (err) {
      setAlerts({
        error: err.response?.data?.error || "Failed to save income",
        success: "",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-color)]" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center">
            <button
              onClick={() => navigate("/incomes")}
              className="mr-4 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? "Edit Income" : "Add New Income"}
            </h1>
          </div>
          <p className="ml-11 text-gray-600">
            {isEdit
              ? "Update your income details"
              : "Add a new income source to track your earnings"}
          </p>
        </div>

        {/* Alerts */}
        <Alert type="error" message={alerts.error} />
        <Alert type="success" message={alerts.success} />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg bg-white p-6 shadow-lg"
        >
          {/* Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount *
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              disabled={loading}
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent-color)]"
            />
            {formData.amount && (
              <p className="mt-1 text-sm text-gray-500">
                {formatCurrency(parseFloat(formData.amount) || 0)}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent-color)]"
            />
          </div>

          {/* Source */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Source
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent-color)]"
            >
              <option value="">Select a source</option>
              {["Salary", "Freelance", "Investment", "Business", "Rental", "Bonus", "Other"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              disabled={loading}
              placeholder="Additional details about this income (optional)"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--accent-color)]"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center rounded-lg bg-[var(--primary-color)] px-6 py-3 font-medium text-white hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? <Loader /> : isEdit ? "Update Income" : "Create Income"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/incomes")}
              disabled={loading}
              className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;
