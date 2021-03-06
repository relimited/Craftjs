//Scalar Arithmetic Testing
define(['inheritance', 'csp', 'floatVariable', 'mathUtil', 'interval'], function(Inheritance, CSP, FloatVariable, MathUtil, Interval){
    describe("Testing Scalar Arithmetic", function(){
        assertUnique = function(v, value){
            expect(v.isUnique()).toBe(true);
            expect(value == v.uniqueValue()).toBe(true);
        };
        it("Unconstrained Sum Tests", function(){
            console.log("======================================");
            console.log("Unconstrained Sum Tests");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);

            for(var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(sum.uniqueValue(), (a.uniqueValue() + b.uniqueValue()))).toBe(true);
            }
        });

        it("Semi-Constrained Sum Test", function(){
            console.log("======================================");
            console.log("Semi-Constrained Sum Tests");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);
            sum.mustEqual(1);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(sum.uniqueValue(), (a.uniqueValue() + b.uniqueValue()))).toBe(true);
            }
        });

        it("Quadratic Tests", function(){
            console.log("======================================");
            console.log("Quadratic Sum Tests");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -100, 100);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, -100, 100);
            var quad = FloatVariable.add(FloatVariable.pow(a, 2), b);
            var fail = [false];
            quad.mustBeContainedInRange(10, 20);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(quad.uniqueValue(), ((a.uniqueValue() * a.uniqueValue()) + b.uniqueValue()))).toBe(true);
                //expect(quad.uniqueValue() >= 10 && quad.uniqueValue() <= 20).toBe(true);
            }
        });

        it("Non-linear Product Tests", function(){
            console.log("======================================");
            console.log("Non-linear Product Tests");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -100, 100);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, -100, 100);
            var mul = FloatVariable.multiply(a, b);
            mul.mustBeContainedInRange(10, 20);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(mul.uniqueValue(), (a.uniqueValue() * b.uniqueValue()))).toBe(true);
            }
        });

        it("Non-linear Integer Quotent Tests", function(){
            console.log("======================================");
            console.log("Non-linear Quotent Tests");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -100, 100);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, -100, 100);
            var div = FloatVariable.divide(a, b);
            div.mustBeContainedInRange(10, 20);

            for (var i = 0; i < 1000; i++){
                p.newSolution();
                expect(MathUtil.nearlyEqual(div.uniqueValue(), (a.uniqueValue() / b.uniqueValue()))).toBe(true);
            }
        });

        it("Sum Test", function(){
            console.log("======================================");
            console.log("Sum Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);
            a.mustEqual(0.5);
            b.mustEqual(0.25);

            p.testConsistency();
            assertUnique(sum, 0.75);
        });

        it("Sum A term Test", function(){
            console.log("======================================");
            console.log("Sum A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);
            b.mustEqual(0.5);
            sum.mustEqual(1);

            p.testConsistency();
            assertUnique(a, 0.5);
        });

        it("Sum B Term Test", function(){
            console.log("======================================");
            console.log("Sum B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);
            a.mustEqual(0.5);
            sum.mustEqual(1);

            p.testConsistency();
            assertUnique(b, 0.5);
        });

        it("Sum Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Sum Test w/ constant A term");
            console.log("======================================");
            var p = new CSP();
            var a = 0.5;
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);
            b.mustEqual(0.25);

            p.testConsistency();
            assertUnique(sum, 0.75);
        });

        it("Sum B Term Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Sum B Term Test w/ constant A term");
            console.log("======================================");
            var p = new CSP();
            var a = 0.5;
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var sum = FloatVariable.add(a, b);
            sum.mustEqual(1);

            p.testConsistency();
            assertUnique(b, 0.5);
        });

        it("Sum Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Sum Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = 0.25;
            var sum = FloatVariable.add(a, b);
            a.mustEqual(0.5);

            p.testConsistency();
            assertUnique(sum, 0.75);
        });

        it("Sum A term Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Sum A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = 0.5;
            var sum = FloatVariable.add(a, b);
            sum.mustEqual(1);

            p.testConsistency();
            assertUnique(a, 0.5);
        });

        it("Difference Test", function(){
            console.log("======================================");
            console.log("Difference Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var difference = FloatVariable.subtract(a, b);
            a.mustEqual(0.5);
            b.mustEqual(0.25);

            p.testConsistency();
            assertUnique(difference, 0.25);
        });

        it("Difference A Term Test", function(){
            console.log("======================================");
            console.log("Difference A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var difference = FloatVariable.subtract(a, b);
            b.mustEqual(0.5);
            difference.mustEqual(0.5);

            p.testConsistency();
            assertUnique(a, 1);
        });

        it("Difference B Term Test", function(){
            console.log("======================================");
            console.log("Difference B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var difference = FloatVariable.subtract(a, b);
            a.mustEqual(0.5);
            difference.mustEqual(0.25);

            p.testConsistency();
            assertUnique(b, 0.25);
        });

        it("Difference Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Difference Test");
            console.log("======================================");
            var p = new CSP();
            var a = 0.5;
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var difference = FloatVariable.subtract(a, b);
            b.mustEqual(0.25);

            p.testConsistency();
            assertUnique(difference, 0.25);
        });

        it("Difference B Term Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Difference B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = 0.5;
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var difference = FloatVariable.subtract(a, b);
            difference.mustEqual(0.25);

            p.testConsistency();
            assertUnique(b, 0.25);
        });

        it("Difference Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Difference Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = 0.25;
            var difference = FloatVariable.subtract(a, b);
            a.mustEqual(0.5);

            p.testConsistency();
            assertUnique(difference, 0.25);
        });

        it("Difference A Term Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Difference A Term Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = 0.5;
            var difference = FloatVariable.subtract(a, b);
            difference.mustEqual(0.5);

            p.testConsistency();
            assertUnique(a, 1);
        });

        it("Product Test", function(){
            console.log("======================================");
            console.log("Product Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var product = FloatVariable.multiply(a, b);
            a.mustEqual(0.5);
            b.mustEqual(0.5);

            p.testConsistency();
            assertUnique(product, 0.25);
        });

        it("Product A Term Test", function(){
            console.log("======================================");
            console.log("Product A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var product = FloatVariable.multiply(a, b);

            b.mustEqual(0.5);
            product.mustEqual(0.5);

            p.testConsistency();
            assertUnique(a, 1);
        });

        it("Product B Term Test", function(){
            console.log("======================================");
            console.log("Product B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var product = FloatVariable.multiply(a, b);

            a.mustEqual(0.5);
            product.mustEqual(0.25);
            p.testConsistency();
            assertUnique(b, 0.5);

        });

        it("Const Product Test", function(){
            console.log("======================================");
            console.log("Const Product Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 4;
            var product = FloatVariable.multiply(a, k);

            a.mustEqual(0.5);
            p.testConsistency();
            assertUnique(product, 2);
        });

        it("Const Product A Term Test", function(){
            console.log("======================================");
            console.log("Const Product A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 4;
            var product = FloatVariable.multiply(a, k);
            product.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 0.5);
        });

        it("Const Product k=0 Test", function(){
            console.log("======================================");
            console.log("Const Product k=0 Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 0;
            var product = FloatVariable.multiply(a, k);
            a.mustEqual(0.5);

            p.testConsistency();
            assertUnique(product, 0);
        });

        it("Const Product k=0 A Term Test", function(){
            console.log("======================================");
            console.log("Const Product k=0 A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 0;
            var product = FloatVariable.multiply(a, k);
            product.mustEqual(0);

            p.testConsistency();
            expect(new Interval(0, 1).equals(a.value())).toBe(true);
        });

        it("Const Product Test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 4;
            var product = FloatVariable.multiply(k, a);

            a.mustEqual(0.5);
            p.testConsistency();
            assertUnique(product, 2);
        });

        it("Const Product A Term Test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product A Term Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 4;
            var product = FloatVariable.multiply(k, a);
            product.mustEqual(2);

            p.testConsistency();
            assertUnique(a, 0.5);
        });

        it("Const Product k=0 Test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product k=0 Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 0;
            var product = FloatVariable.multiply(k, a);
            a.mustEqual(0.5);

            p.testConsistency();
            assertUnique(product, 0);
        });

        it("Const Product k=0 A Term Test, reversed arguments", function(){
            console.log("======================================");
            console.log("Const Product k=0 A Term Test, reversed arguments");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var k = 0;
            var product = FloatVariable.multiply(k, a);
            product.mustEqual(0);

            p.testConsistency();
            expect(new Interval(0, 1).equals(a.value())).toBe(true);
        });

        it("Quotient Test", function(){
            console.log("======================================");
            console.log("Quotient Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var quotent = FloatVariable.divide(a, b);

            a.mustEqual(0.5);
            b.mustEqual(0.5);

            p.testConsistency();
            assertUnique(quotent, 1);
        });

        it("Quotent A Term Test", function(){
            console.log("======================================");
            console.log("Quotient A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 3);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 3);
            var quotent = FloatVariable.divide(a, b);

            b.mustEqual(0.5);
            quotent.mustEqual(0.5);

            p.testConsistency();
            assertUnique(a, 0.25);
        });

        it("Quotent B Term Test", function(){
            console.log("======================================");
            console.log("Quotient B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 3);
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 3);
            var quotent = FloatVariable.divide(a, b);

            a.mustEqual(0.5);
            quotent.mustEqual(0.25);

            p.testConsistency();
            assertUnique(b, 2);
        });

        it("Quotient Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Quotient Test");
            console.log("======================================");
            var p = new CSP();
            var a = 0.5;
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1);
            var quotent = FloatVariable.divide(a, b);

            b.mustEqual(0.5);

            p.testConsistency();
            assertUnique(quotent, 1);
        });

        it("Quotent B Term Test w/ constant A term", function(){
            console.log("======================================");
            console.log("Quotient B Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = 0.5;
            var b = FloatVariable.makeFloatVariableWithBounds("b", p, 0, 3);
            var quotent = FloatVariable.divide(a, b);

            quotent.mustEqual(0.25);

            p.testConsistency();
            assertUnique(b, 2);
        });

        it("Quotient Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Quotient Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1);
            var b = 0.5
            var quotent = FloatVariable.divide(a, b);

            a.mustEqual(0.5);

            p.testConsistency();
            assertUnique(quotent, 1);
        });

        it("Quotent A Term Test w/ constant B term", function(){
            console.log("======================================");
            console.log("Quotient A Term Test w/ constant B term");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 3);
            var b = 0.5;
            var quotent = FloatVariable.divide(a, b);

            quotent.mustEqual(0.5);

            p.testConsistency();
            assertUnique(a, 0.25);
        });

        it("Odd Power Negative Tests", function(){
            console.log("======================================");
            console.log("Odd Power Negative Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 3);
            var power = FloatVariable.pow(a, 3);
            a.mustEqual(-2);

            p.testConsistency();
            assertUnique(power, -8);
        });

        it("Odd Power Negative A Term Test", function(){
            console.log("======================================");
            console.log("Odd Power Negative A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 3);
            var power = FloatVariable.pow(a, 3);
            power.mustEqual(-8);

            p.testConsistency();
            assertUnique(a, -2);
        });

        it("Odd Power Positive Test", function(){
            console.log("======================================");
            console.log("Odd Power Positive Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 3);
            var power = FloatVariable.pow(a, 3);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(power, 8);
        });

        it("Odd Power Positive A Term", function(){
            console.log("======================================");
            console.log("Odd Power Positive A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 3);
            var power = FloatVariable.pow(a, 3);
            power.mustEqual(8);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Even Power Positive A Test", function(){
            console.log("======================================");
            console.log("Even Power Positive A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 3);
            var power = FloatVariable.pow(a, 2);
            power.mustEqual(4);

            p.testConsistency();
            assertUnique(a, 2);
        });

        it("Even Power Positive Test", function(){
            console.log("======================================");
            console.log("Even Power Positive Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, 0, 3);
            var power = FloatVariable.pow(a, 2);
            a.mustEqual(2);

            p.testConsistency();
            assertUnique(power, 4);
        });

        it("Even Power Negative A Term Test", function(){
            console.log("======================================");
            console.log("Even Power Negative A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 0);
            var power = FloatVariable.pow(a, 2);
            power.mustEqual(4);

            p.testConsistency();
            assertUnique(a, -2);
        });

        it("Even Power Negative Test", function(){
            console.log("======================================");
            console.log("Even Power Negative Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 0);
            var power = FloatVariable.pow(a, 2);
            a.mustEqual(-2);

            p.testConsistency();
            assertUnique(power, 4);
        });

        it("Even Power Zero Crossing A Term Test", function(){
            console.log("======================================");
            console.log("Even Power Zero Crossing A Term Test");
            console.log("======================================");
            var p = new CSP();
            var a = FloatVariable.makeFloatVariableWithBounds("a", p, -3, 3);
            var power = FloatVariable.pow(a, 2);
            power.mustEqual(4);

            p.testConsistency();
            expect(new Interval(-2, 2).equals(a.value())).toBe(true);
        });

        it("Constant Construction Test", function(){
          console.log("=========================================");
          console.log("Testing Sum With Constant");
          console.log("=========================================");
          var p = new CSP();
          var b = FloatVariable.makeFloatConstant("b", p, 0.5);

          expect(new Interval(0.5, 0.5).equals(b.value())).toBe(true);
        });

        it("Sum All FloatVar 2 arg Test", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 2 vars");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);
          argArray[1].mustEqual(0.5);
          argArray[0].mustEqual(0.5);

          p.testConsistency();
          assertUnique(sum, 1);
        });

        it("Sum All FloatVar 2 arg Test (first arg test)", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 2 vars (first arg test)");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);
          sum.mustEqual(1);
          argArray[0].mustEqual(0.5);

          p.testConsistency();
          assertUnique(argArray[1], 0.5);
        });

        it("Sum All FloatVar 2 arg Test (second arg test)", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 2 vars (first arg test)");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);
          sum.mustEqual(1);
          argArray[1].mustEqual(0.5);

          p.testConsistency();
          assertUnique(argArray[0], 0.5);
        });

        it("Sum All unconstrained FloatVar 3 arg Test", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("c", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);

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
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("b", p, 0, 1));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("c", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);
          sum.mustEqual(1);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), 1)).toBe(true);
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });

        it("Sum All unconstrained FloatVar 3 arg Test w/ a const", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars w/ a const");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatConstant("b", p, 0.5));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("c", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });

        it("Sum All semi-constrained FloatVar 3 arg Test w/ a const", function(){
          console.log("==========================================");
          console.log("Testing sum out operation with 3 vars w/ a const");
          console.log("==========================================");
          var p = new CSP();
          var argArray = [];
          argArray.push(FloatVariable.makeFloatVariableWithBounds("a", p, 0, 1));
          argArray.push(FloatVariable.makeFloatConstant("b", p, 0.5));
          argArray.push(FloatVariable.makeFloatVariableWithBounds("c", p, 0, 1));
          var sum = FloatVariable.sumAll(argArray);
          sum.mustEqual(1);

          for(var i = 0; i < 1000; i++){
              p.newSolution();
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), 1)).toBe(true);
              expect(MathUtil.nearlyEqual(sum.uniqueValue(), (argArray[0].uniqueValue() + argArray[1].uniqueValue() + argArray[2].uniqueValue()))).toBe(true);
          }
        });
    });
});
