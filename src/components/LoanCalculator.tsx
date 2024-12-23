import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

const LoanCalculator = () => {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = parseFloat(amount);
    const annualRate = parseFloat(interest) / 100;
    const monthlyRate = annualRate / 12;
    const months = parseFloat(years) * 12;

    if (!principal || !annualRate || !months) return;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
    });
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Loan Calculator</h1>
          <p className="text-sm text-muted-foreground">
            Calculate your monthly loan payments
          </p>
        </div>

        <form onSubmit={calculateLoan} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Loan Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g. 10000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">Annual Interest Rate (%)</Label>
            <Input
              id="interest"
              type="number"
              step="0.1"
              placeholder="e.g. 5.5"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Loan Term (Years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g. 5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Calculate Loan
          </Button>
        </form>

        {result && (
          <div className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-2xl font-bold text-primary">
                  ${result.monthlyPayment}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Payment</p>
                <p className="text-2xl font-bold text-primary">
                  ${result.totalPayment}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4 text-center">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold text-primary">
                  ${result.totalInterest}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoanCalculator;