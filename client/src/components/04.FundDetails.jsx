import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function FundDetails() {

    const { schemeCode } = useParams();

    const [fundInfo, setFundInfo] = useState(null);
    const [rollingReturns1year, setRollingReturns1] = useState(null);
    const [rollingReturns2year, setRollingReturns2] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!schemeCode) return;

        const fetchData = async () => {
            try {
                const [fundRes, returnsRes1, returnsRes2] = await Promise.all([
                    axios.get(`http://localhost:3000/fund/${schemeCode}`),
                    axios.get(`http://localhost:3000/fund/rolling?fundID=${schemeCode}&rollingYear=1`),
                    axios.get(`http://localhost:3000/fund/rolling?fundID=${schemeCode}&rollingYear=2`)
                ]);

                setFundInfo(fundRes.data[0] || null);
                setRollingReturns1(returnsRes1.data || null);
                setRollingReturns2(returnsRes2.data || null);

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [schemeCode]);

    // ✅ Correct logging (no stale state)
    useEffect(() => {
        if (rollingReturns1year) console.log("1Y:", rollingReturns1year);
    }, [rollingReturns1year]);

    useEffect(() => {
        if (rollingReturns2year) console.log("2Y:", rollingReturns2year);
    }, [rollingReturns2year]);

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
                    <RatioCard title="Alpha" value={fundInfo?.alpha} />
                    <RatioCard title="Beta" value={fundInfo?.beta} />
                    <RatioCard title="Std Dev" value={fundInfo?.std_dev} />
                    <RatioCard title="Sharpe" value={fundInfo?.sharpe} />
                    <RatioCard title="Sortino" value={fundInfo?.sortino} />
                    <RatioCard title="Treynor" value={fundInfo?.treynor} />
                    <RatioCard title="Info Ratio" value={fundInfo?.info_ratio} />
                    <RatioCard title="Max Drawdown" value={fundInfo?.max_drawdown} />
                </div>
            </div>

            {/* ===== Rolling Returns ===== */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Rolling Returns</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ReturnCard year={1} value={rollingReturns1year?.avg ?? "--"} />
                    <ReturnCard year={2} value={rollingReturns2year?.avg ?? "--"} />
                </div>

                <div className="h-64 mt-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    Chart Coming Soon...
                </div>
            </div>

            {/* ===== Capture Ratios ===== */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Capture Ratios</h2>

                <div className="grid grid-cols-2 gap-6">
                    <RatioCard title="Up Capture" value={fundInfo?.up_capture} />
                    <RatioCard title="Down Capture" value={fundInfo?.down_capture} />
                </div>
            </div>

        </div>
    );
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
            <p className="mt-2 font-semibold">{value.toFixed(2)}%</p>
        </div>
    );
}