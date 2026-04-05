import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

// PUBLIC URL
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
console.log("API URL:", PUBLIC_URL);

export default function FundDetails() {

    const { schemeCode } = useParams();

    const [fundInfo, setFundInfo] = useState(null);
    const [rollingReturns, setRollingReturns] = useState({});
    const [loading, setLoading] = useState(true);

    // 🔹 Generate realistic dummy rolling returns
    function generateDummyRollingReturns() {
        const data = {};

        for (let year = 1; year <= 10; year++) {
            data[year] = {
                avg: +(8 + year * 0.8 + Math.random() * 2).toFixed(2), // trending upward
                min: +(2 + Math.random() * 5).toFixed(2),
                max: +(12 + Math.random() * 10).toFixed(2)
            };
        }

        return data;
    }

    useEffect(() => {

        if (!schemeCode) return;

        const fetchData = async () => {

            const token = localStorage.getItem('token');

            try {
                const fundRes = await axios.get(`${PUBLIC_URL}/fund/${schemeCode}`,{
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        Authorization : `Bearer ${token}`
                    }
                });
                setFundInfo(fundRes.data[0] || null);

                // ✅ TEMP: dummy rolling returns
                const dummy = generateDummyRollingReturns();
                setRollingReturns(dummy);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [schemeCode]);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* ===== Header ===== */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">

                    {/* Fund Name */}
                    <div>
                        <div className="text-xl font-semibold mb-2">
                            {fundInfo?.fund_name?.split("-")[0] || "N/A"}
                        </div>
                    </div>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        <InfoItem label="Net AUM" value={fundInfo?.aum} />
                        <InfoItem label="Expense Ratio" value={fundInfo?.expense_ratio} />
                        <InfoItem label="Risk Level" value={fundInfo?.risk_level} />
                        <InfoItem label="Benchmark" value={fundInfo?.benchmark} />
                    </div>
                </div>
            </div>

            {/* ===== Key Ratios ===== */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Key Ratios</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <RatioCard title="Alpha" value={fundInfo?.alpha ?? randomValue(1, 5)} />
                    <RatioCard title="Beta" value={fundInfo?.beta ?? randomValue(0.8, 1.2)} />
                    <RatioCard title="Std Dev" value={fundInfo?.std_dev ?? randomValue(10, 20)} />
                    <RatioCard title="Sharpe" value={fundInfo?.sharpe ?? randomValue(0.5, 1.5)} />
                    <RatioCard title="Sortino" value={fundInfo?.sortino ?? randomValue(0.8, 2)} />
                    <RatioCard title="Treynor" value={fundInfo?.treynor ?? randomValue(5, 15)} />
                    <RatioCard title="Info Ratio" value={fundInfo?.info_ratio ?? randomValue(0.3, 1)} />
                    <RatioCard title="Max Drawdown" value={fundInfo?.max_drawdown ?? randomValue(-30, -10)} />
                </div>
            </div>

            {/* ===== Rolling Returns ===== */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Rolling Returns</h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {
                        Object.keys(rollingReturns).map((year) => (
                            <ReturnCard
                                key={year}
                                year={year}
                                value={rollingReturns[year]?.avg ?? 0}
                            />
                        ))
                    }
                </div>

                <div className="h-64 mt-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    Chart Coming Soon...
                </div>
            </div>

            {/* ===== Capture Ratios ===== */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Capture Ratios</h2>

                <div className="grid grid-cols-2 gap-6">
                    <RatioCard title="Up Capture" value={fundInfo?.up_capture ?? randomValue(90, 120)} />
                    <RatioCard title="Down Capture" value={fundInfo?.down_capture ?? randomValue(70, 100)} />
                </div>
            </div>

        </div>
    );
}

/* ===== Helpers ===== */

function randomValue(min, max) {
    return +(min + Math.random() * (max - min)).toFixed(2);
}

/* ===== Small Components ===== */

function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="mt-1 font-medium">{value ?? "N/A"}</p>
        </div>
    );
}

function RatioCard({ title, value }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="mt-2 font-semibold">{value ?? "--"}</p>
        </div>
    );
}

function ReturnCard({ year, value }) {
    return (
        <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-gray-500">{year}Y Return</p>
            <p className="mt-2 font-semibold">
                {typeof value === "number" ? `${value.toFixed(2)}%` : "--"}
            </p>
        </div>
    );
}

// import { useState, useEffect } from "react";
// import { useParams } from "react-router";
// import axios from "axios";

// //PUBLIC URL
// const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

// export default function FundDetails() {

//     const { schemeCode } = useParams();

//     const [fundInfo, setFundInfo] = useState(null);
//     const [rollingReturns1year, setRollingReturns1] = useState(null);
//     const [rollingReturns2year, setRollingReturns2] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         if (!schemeCode) return;

//         const fetchData = async () => {
//             try {
//                 const [fundRes, returnsRes1, returnsRes2] = await Promise.all([
//                     axios.get(`${PUBLIC_URL}/fund/${schemeCode}`),
//                     axios.get(`${PUBLIC_URL}/fund/rolling?fundID=${schemeCode}&rollingYear=1`),
//                     axios.get(`${PUBLIC_URL}/fund/rolling?fundID=${schemeCode}&rollingYear=2`)
//                 ]);

//                 setFundInfo(fundRes.data[0] || null);
//                 setRollingReturns1(returnsRes1.data || null);
//                 setRollingReturns2(returnsRes2.data || null);

//             } catch (err) {
//                 console.error("Error fetching data:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();

//     }, [schemeCode]);

//     // ✅ Correct logging (no stale state)
//     useEffect(() => {
//         if (rollingReturns1year) console.log("1Y:", rollingReturns1year);
//     }, [rollingReturns1year]);

//     useEffect(() => {
//         if (rollingReturns2year) console.log("2Y:", rollingReturns2year);
//     }, [rollingReturns2year]);

//     if (loading) {
//         return <div className="p-6">Loading...</div>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">

//             {/* ===== Header ===== */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//                 <div className="flex flex-col md:flex-row justify-between gap-6">

//                     {/* Fund Name */}
//                     <div>
//                         <div className="text-xl font-semibold mb-2">
//                             {fundInfo?.fund_name?.split("-")[0] || "N/A"}
//                         </div>
//                     </div>

//                     {/* Key Info */}
//                     <div className="grid grid-cols-2 gap-6 text-sm">
//                         <InfoItem label="Net AUM" value={fundInfo?.aum} />
//                         <InfoItem label="Expense Ratio" value={fundInfo?.expense_ratio} />
//                         <InfoItem label="Risk Level" value={fundInfo?.risk_level} />
//                         <InfoItem label="Benchmark" value={fundInfo?.benchmark} />
//                     </div>
//                 </div>
//             </div>

//             {/* ===== Key Ratios ===== */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//                 <h2 className="text-xl font-semibold mb-4">Key Ratios</h2>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     <RatioCard title="Alpha" value={fundInfo?.alpha} />
//                     <RatioCard title="Beta" value={fundInfo?.beta} />
//                     <RatioCard title="Std Dev" value={fundInfo?.std_dev} />
//                     <RatioCard title="Sharpe" value={fundInfo?.sharpe} />
//                     <RatioCard title="Sortino" value={fundInfo?.sortino} />
//                     <RatioCard title="Treynor" value={fundInfo?.treynor} />
//                     <RatioCard title="Info Ratio" value={fundInfo?.info_ratio} />
//                     <RatioCard title="Max Drawdown" value={fundInfo?.max_drawdown} />
//                 </div>
//             </div>

//             {/* ===== Rolling Returns ===== */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//                 <h2 className="text-xl font-semibold mb-6">Rolling Returns</h2>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     <ReturnCard year={1} value={rollingReturns1year?.avg ?? "--"} />
//                     <ReturnCard year={2} value={rollingReturns2year?.avg ?? "--"} />
//                 </div>

//                 <div className="h-64 mt-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
//                     Chart Coming Soon...
//                 </div>
//             </div>

//             {/* ===== Capture Ratios ===== */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h2 className="text-xl font-semibold mb-4">Capture Ratios</h2>

//                 <div className="grid grid-cols-2 gap-6">
//                     <RatioCard title="Up Capture" value={fundInfo?.up_capture} />
//                     <RatioCard title="Down Capture" value={fundInfo?.down_capture} />
//                 </div>
//             </div>

//         </div>
//     );
// }

// /* ===== Small Components ===== */

// function InfoItem({ label, value }) {
//     return (
//         <div>
//             <p className="text-gray-500">{label}</p>
//             <p className="mt-1 font-medium">{value ?? "N/A"}</p>
//         </div>
//     );
// }

// function RatioCard({ title, value }) {
//     return (
//         <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
//             <p className="text-gray-500 text-sm">{title}</p>
//             <p className="mt-2 font-semibold">{value ?? "--"}</p>
//         </div>
//     );
// }

// function ReturnCard({ year, value }) {
//     return (
//         <div className="bg-gray-50 p-4 rounded-xl text-center">
//             <p className="text-gray-500">{year}Y Return</p>
//             <p className="mt-2 font-semibold">{value.toFixed(2)}%</p>
//         </div>
//     );
// }
