const About = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">About Health Tracker</h1>
          <div className="space-y-4 text-gray-600">
            <p>
              Health Tracker is your companion in maintaining a healthy lifestyle. Our BMI calculator
              helps you understand your body mass index and provides personalized recommendations
              based on your results.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Understanding BMI</h2>
            <p>
              Body Mass Index (BMI) is a simple measure that uses your height and weight to work
              out if your weight is healthy. The BMI calculation divides an adult's weight in
              kilograms by their height in metres squared.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">BMI Categories</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Underweight = less than 18.5</li>
              <li>Normal weight = 18.5 to 24.9</li>
              <li>Overweight = 25 to 29.9</li>
              <li>Obesity = BMI of 30 or greater</li>
            </ul>
            <p className="text-sm text-gray-500 mt-6">
              Note: BMI is a general guide and may not be accurate for athletes, elderly people,
              or pregnant women. Always consult with healthcare professionals for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;