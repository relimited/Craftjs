//Integer Scalar Arithmetic Testing
define(['inheritance', 'csp', 'floatVariable', 'integerVariable', 'mathUtil', 'interval', 'integerInterval'], function(Inheritance, CSP, FloatVariable, IntegerVariable, MathUtil, Interval, IntegerInterval){
    describe("Testing Integer Scalar Arithmetic", function(){
        assertUnique = function(v, value){
            expect(v.isUnique()).toBe(true);
            expect(value == v.uniqueValue()).toBe(true);
        };

        it("Unconstrained Integer Sum Tests", function(){
            console.log("======================================");
            console.log("Unconstrained Sum Tests");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 100);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 100);
            var sum = IntegerVariable.add(a, b);

            for(var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(sum.uniqueValue(), (a.uniqueValue() + b.uniqueValue()))).toBe(true);
                expect(Number.isInteger(a.uniqueValue())).toBe(true);
                expect(Number.isInteger(b.uniqueValue())).toBe(true);
                expect(Number.isInteger(sum.uniqueValue())).toBe(true);
            }
        });

        it("Semi-Constrained Integer Sum Test", function(){
            console.log("======================================");
            console.log("Semi-Constrained Sum Tests");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 10);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 10);
            var sum = IntegerVariable.add(a, b);
            sum.mustEqual(10);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(sum.uniqueValue(), (a.uniqueValue() + b.uniqueValue()))).toBe(true);
                expect(Number.isInteger(a.uniqueValue())).toBe(true);
                expect(Number.isInteger(b.uniqueValue())).toBe(true);
                expect(Number.isInteger(sum.uniqueValue())).toBe(true);
            }
        });

        it("Quadratic Sum Integer Tests", function(){
            console.log("======================================");
            console.log("Quadratic Sum Tests");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -100, 100);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, -100, 100);
            var quad = IntegerVariable.add(IntegerVariable.pow(a, 2), b);
            quad.mustBeContainedInRange(10, 20);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(quad.uniqueValue(), ((a.uniqueValue() * a.uniqueValue()) + b.uniqueValue()))).toBe(true);
                expect(Number.isInteger(a.uniqueValue())).toBe(true);
                expect(Number.isInteger(b.uniqueValue())).toBe(true);
                expect(Number.isInteger(quad.uniqueValue())).toBe(true);
            }
        });

        it("Non-linear Integer Product Tests", function(){
            console.log("======================================");
            console.log("Non-linear Integer Product Tests");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -100, 100);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, -100, 100);
            var mul = IntegerVariable.multiply(a, b);
            mul.mustBeContainedInRange(10, 20);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(mul.uniqueValue(), (a.uniqueValue() * b.uniqueValue()))).toBe(true);
                expect(Number.isInteger(a.uniqueValue())).toBe(true);
                expect(Number.isInteger(b.uniqueValue())).toBe(true);
                expect(Number.isInteger(mul.uniqueValue())).toBe(true);
            }
        });

        it("Non-linear Integer Quotent Tests", function(){
            console.log("======================================");
            console.log("Non-linear Integer Quotent Tests");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -100, 100);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, -100, 100);
            var div = IntegerVariable.divide(a, b);
            div.mustBeContainedInRange(10, 20);

            for (var i = 0; i < 1000; i++){
                p.newSolution();

                expect(MathUtil.nearlyEqual(div.uniqueValue(), (a.uniqueValue() / b.uniqueValue()))).toBe(true);
                expect(Number.isInteger(a.uniqueValue())).toBe(true);
                expect(Number.isInteger(b.uniqueValue())).toBe(true);
                expect(Number.isInteger(div.uniqueValue())).toBe(true);
            }
        });

        it("Integer Sum Test", function(){
            console.log("======================================");
            console.log("Sum Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var sum = IntegerVariable.add(a, b);
            a.mustEqual(1);
            b.mustEqual(1);

            p.testConsistency();
            assertUnique(sum, 2);
        });

        it("Integer Sum A term Test", function(){
            console.log("======================================");
            console.log("Sum A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var sum = IntegerVariable.add(a, b);
            b.mustEqual(1);
            sum.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 1);
        });

        it("Integer Sum B Term Test", function(){
            console.log("======================================");
            console.log("Sum B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var sum = IntegerVariable.add(a, b);
            a.mustEqual(1);
            sum.mustEqual(2);

            p.testConsistency();
            assertUnique(b, 1);
        });

        it("Integer Sum Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Sum Test w/ constant A term");
            console.log("======================================");
            var p = new CSP();
            var a = 1;
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var sum = IntegerVariable.add(a, b);
            b.mustEqual(1);

            p.testConsistency();
            assertUnique(sum, 2);
        });

        it("Integer Sum B Term Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Sum B Term Test w/ constant A term");
            console.log("======================================");
            var p = new CSP();
            var a = 1;
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var sum = IntegerVariable.add(a, b);
            sum.mustEqual(2);

            p.testConsistency();
            assertUnique(b, 1);
        });

        it("Integer Sum Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Sum Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = 1;
            var sum = IntegerVariable.add(a, b);
            a.mustEqual(1);

            p.testConsistency();
            assertUnique(sum, 2);
        });

        it("Integer Sum A term Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Sum A Term Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = 1;
            var sum = IntegerVariable.add(a, b);
            sum.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 1);
        });

        it("Integer Difference Test", function(){
            console.log("======================================");
            console.log("Difference Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var difference = IntegerVariable.subtract(a, b);
            a.mustEqual(2);
            b.mustEqual(1);

            p.testConsistency();
            assertUnique(difference, 1);
        });

        it("Integer Difference A Term Test", function(){
            console.log("======================================");
            console.log("Difference A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var difference = IntegerVariable.subtract(a, b);
            b.mustEqual(1);
            difference.mustEqual(1);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Difference B Term Test", function(){
            console.log("======================================");
            console.log("Difference B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var difference = IntegerVariable.subtract(a, b);
            a.mustEqual(2);
            difference.mustEqual(1);

            p.testConsistency();
            assertUnique(b, 1);
        });

        it("Integer Difference Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Difference Test w/ constant A term");
            console.log("======================================");
            var p = new CSP();
            var a = 2;
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var difference = IntegerVariable.subtract(a, b);
            b.mustEqual(1);

            p.testConsistency();
            assertUnique(difference, 1);
        });

        it("Integer Difference B Term Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Difference B Term Test w/ constant A term");
            console.log("======================================");
            var p = new CSP();
            var a = 2;
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var difference = IntegerVariable.subtract(a, b);
            difference.mustEqual(1);

            p.testConsistency();
            assertUnique(b, 1);
        });

        it("Integer Difference Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Difference Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = 1;
            var difference = IntegerVariable.subtract(a, b);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(difference, 1);
        });

        it("Integer Difference A Term Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Difference A Term Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = 1;
            var difference = IntegerVariable.subtract(a, b);
            difference.mustEqual(1);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Product Test", function(){
            console.log("======================================");
            console.log("Product Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var product = IntegerVariable.multiply(a, b);
            a.mustEqual(2);
            b.mustEqual(2);

            p.testConsistency();
            assertUnique(product, 4);
        });

        it("Integer Product A Term Test", function(){
            console.log("======================================");
            console.log("Product A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var product = IntegerVariable.multiply(a, b);

            b.mustEqual(2);
            product.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 1);
        });

        it("Integer Product B Term Test", function(){
            console.log("======================================");
            console.log("Product B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var product = IntegerVariable.multiply(a, b);

            a.mustEqual(1);
            product.mustEqual(2);
            p.testConsistency();
            assertUnique(b, 2);

        });

        it("Integer Const Product Test", function(){
            console.log("======================================");
            console.log("Const Product Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 4;
            var product = IntegerVariable.multiply(a, k);

            a.mustEqual(1);
            p.testConsistency();
            assertUnique(product, 4);
        });

        it("Integer Const Product A Term Test", function(){
            console.log("======================================");
            console.log("Const Product A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 4;
            var product = IntegerVariable.multiply(a, k);
            product.mustEqual(8);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Const Product Test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 4;
            var product = IntegerVariable.multiply(k, a);

            a.mustEqual(1);
            p.testConsistency();
            assertUnique(product, 4);
        });

        it("Integer Const Product A Term Test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product A Term Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 4;
            var product = IntegerVariable.multiply(k, a);
            product.mustEqual(8);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Product=0 Test", function(){
            console.log("======================================");
            console.log("Product=0 Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var product = IntegerVariable.multiply(a, b);
            a.mustEqual(0);
            b.mustEqual(0);

            p.testConsistency();
            assertUnique(product, 0);
        });

        it("Integer Product A Term Test (B=0)", function(){
            console.log("======================================");
            console.log("Product A Term Test (B=0)");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var product = IntegerVariable.multiply(a, b);

            b.mustEqual(0);
            product.mustEqual(0);

            p.testConsistency();
            console.log(a.value());
            expect(new IntegerInterval(0, 2).equals(a.value())).toBe(true);
        });

        it("Integer Product B Term Test (A=0)", function(){
            console.log("======================================");
            console.log("Product B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var product = IntegerVariable.multiply(a, b);

            a.mustEqual(0);
            product.mustEqual(0);
            p.testConsistency();
            expect(new IntegerInterval(0, 2).equals(b.value())).toBe(true);

        });

        it("Integer Const Product k=0 test", function(){
            console.log("======================================");
            console.log("Const Product k=0 Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 0;
            var product = IntegerVariable.multiply(a, k);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(product, 0);
        });

        it("Integer Const Product k=0 A Term test", function(){
            console.log("======================================");
            console.log("Const Product k=0 A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 0;
            var product = IntegerVariable.multiply(a, k);
            product.mustEqual(0);

            p.testConsistency();
            expect(new IntegerInterval(0, 2).equals(a.value())).toBe(true);
        });

        it("Integer Const Product k=0 test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product k=0 Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 0;
            var product = IntegerVariable.multiply(k, a);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(product, 0);
        });

        it("Integer Const Product k=0 A Term test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product k=0 A Term Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 2);
            var k = 0;
            var product = IntegerVariable.multiply(k, a);
            product.mustEqual(0);

            p.testConsistency();
            expect(new IntegerInterval(0, 2).equals(a.value())).toBe(true);
        });

        it("Integer Quotient Test", function(){
            console.log("======================================");
            console.log("Quotient Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 4);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var quotent = IntegerVariable.divide(a, b);

            a.mustEqual(4);
            b.mustEqual(2);

            p.testConsistency();
            assertUnique(quotent, 2);
        });

        it("Integer Quotent A Term Test", function(){
            console.log("======================================");
            console.log("Quotient A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 3);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 3);
            var quotent = IntegerVariable.divide(a, b);

            b.mustEqual(1);
            quotent.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Quotent B Term Test", function(){
            console.log("======================================");
            console.log("Quotient B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 3);
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 3);
            var quotent = IntegerVariable.divide(a, b);

            a.mustEqual(2);
            quotent.mustEqual(2);

            p.testConsistency();
            assertUnique(b, 1);
        });

        it("Integer Quotient Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Quotient Test");
            console.log("======================================");
            var p = new CSP();
            var a = 4;
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 2);
            var quotent = IntegerVariable.divide(a, b);
            b.mustEqual(2);

            p.testConsistency();
            assertUnique(quotent, 2);
        });

        it("Integer Quotent B Term Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Quotient B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = 2;
            var b = IntegerVariable.makeIntVariableWithBounds("b", p, 0, 3);
            var quotent = IntegerVariable.divide(a, b);

            quotent.mustEqual(2);

            p.testConsistency();
            assertUnique(b, 1);
        });

        it("Integer Quotient Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Quotient Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 4);
            var b = 2;
            var quotent = IntegerVariable.divide(a, b);

            a.mustEqual(4);

            p.testConsistency();
            assertUnique(quotent, 2);
        });

        it("Integer Quotent A Term Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Quotient A Term Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 3);
            var b = 1;
            var quotent = IntegerVariable.divide(a, b);

            quotent.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Odd Power Negative Test", function(){
            console.log("======================================");
            console.log("Odd Power Negative Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 3);
            var power = IntegerVariable.pow(a, 3);
            a.mustEqual(-2);

            p.testConsistency();
            assertUnique(power, -8);
        });

        it("Integer Odd Power Negative A Term Test", function(){
            console.log("======================================");
            console.log("Odd Power Negative A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 3);
            var power = IntegerVariable.pow(a, 3);
            power.mustEqual(-8);

            p.testConsistency();
            assertUnique(a, -2);
        });

        it("Integer Odd Power Positive Test", function(){
            console.log("======================================");
            console.log("Odd Power Positive Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 3);
            var power = IntegerVariable.pow(a, 3);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(power, 8);
        });

        it("Integer Odd Power Positive A Term", function(){
            console.log("======================================");
            console.log("Integer Odd Power Positive A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 3);
            var power = IntegerVariable.pow(a, 3);
            power.mustEqual(8);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Integer Even Power Positive A Test", function(){
            console.log("======================================");
            console.log("Even Power Positive A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 3);
            var power = IntegerVariable.pow(a, 2);
            power.mustEqual(4);

            p.newSolution(); //it takes more than one step for the integer variant to find the right solution.
            assertUnique(a, 2);
        });

        it("Integer Even Power Positive Test", function(){
            console.log("======================================");
            console.log("Even Power Positive Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, 0, 3);
            var power = IntegerVariable.pow(a, 2);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(power, 4);
        });

        it("Integer Even Power Negative A Term Test", function(){
            console.log("======================================");
            console.log("Even Power Negative A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 0);
            var power = IntegerVariable.pow(a, 2);
            power.mustEqual(4);

            p.newSolution(); //it takes more than one step for the integer variant to find the right solution.
            assertUnique(a, -2);
        });

        it("Integer Even Power Negative Test", function(){
            console.log("======================================");
            console.log("Even Power Negative Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 0);
            var power = IntegerVariable.pow(a, 2);
            a.mustEqual(-2);

            p.testConsistency();
            assertUnique(power, 4);
        });

        it("Integer Even Power Zero Crossing A Term Test", function(){
            console.log("======================================");
            console.log("Even Power Zero Crossing A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = IntegerVariable.makeIntVariableWithBounds("a", p, -3, 3);
            var power = IntegerVariable.pow(a, 2);
            power.mustEqual(4);

            p.testConsistency();
            expect(new IntegerInterval(-2, 2).equals(a.value())).toBe(true);
        });

        it("Integer Constant Construction Test", function(){
          console.log("=========================================");
          console.log("Testing Constant Construction");
          console.log("=========================================");
          var p = new CSP();
          var b = IntegerVariable.makeIntConstant("b", p, 5);

          expect(new IntegerInterval(5, 5).equals(b.value())).toBe(true);
        });


        it("Sum All FloatVar 2 arg Test", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 2 vars");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("b", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);
          argArray[1].mustEqual(2);
          argArray[0].mustEqual(2);

          p.testConsistency();
          assertUnique(sum, 4);
        });

        it("Sum All FloatVar 2 arg Test (first arg test)", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 2 vars (first arg test)");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("b", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);
          sum.mustEqual(4);
          argArray[0].mustEqual(2);

          p.testConsistency();
          assertUnique(argArray[1], 2);
        });

        it("Sum All FloatVar 2 arg Test (second arg test)", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 2 vars (first arg test)");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("b", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);
          sum.mustEqual(4);
          argArray[1].mustEqual(2);

          p.testConsistency();
          assertUnique(argArray[0], 2);
        });

        it("Sum All unconstrained FloatVar 3 arg Test", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("b", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("c", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });

        it("Sum All semi-constrained FloatVar 3 arg Test", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("b", p, 0, 5));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("c", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);
          sum.mustEqual(10);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), 10)).toBe(true);
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });

        it("Sum All unconstrained FloatVar 3 arg Test w/ a const", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars w/ a const");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntConstant("b", p, 3));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("c", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });

        it("Sum All semi-constrained IntVar 3 arg Test w/ a const", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars w/ a const");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(IntegerVariable.makeIntVariableWithBounds("a", p, 0, 5));
          argArray.push(IntegerVariable.makeIntConstant("b", p, 3));
          argArray.push(IntegerVariable.makeIntVariableWithBounds("c", p, 0, 5));
          var sum = IntegerVariable.sumAll(argArray);
          sum.mustEqual(10);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), 10)).toBe(true);
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });
    });
});
