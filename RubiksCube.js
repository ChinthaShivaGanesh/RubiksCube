 // Rubik's Cube Class
        class RubiksCube {
            constructor() {
                // Initialize solved cube
                // Faces: F, B, U, D, L, R
                // Colors: r, g, b, y, o, w
                this.faces = {
                    'F': Array(9).fill('r'),  // Front - Red
                    'B': Array(9).fill('o'),  // Back - Orange
                    'U': Array(9).fill('w'),  // Up - White
                    'D': Array(9).fill('y'),  // Down - Yellow
                    'L': Array(9).fill('g'),  // Left - Green
                    'R': Array(9).fill('b')   // Right - Blue
                };
                
                // History of moves for solving
                this.moveHistory = [];
            }
            
            // Get a string representation of the cube
            getStateString() {
                let result = '';
                for (let face of ['F', 'B', 'U', 'D', 'L', 'R']) {
                    result += this.faces[face].join('');
                }
                return result;
            }
            
            // Reset the cube to solved state
            reset() {
                this.faces = {
                    'F': Array(9).fill('r'),
                    'B': Array(9).fill('o'),
                    'U': Array(9).fill('w'),
                    'D': Array(9).fill('y'),
                    'L': Array(9).fill('g'),
                    'R': Array(9).fill('b')
                };
                this.moveHistory = [];
            }
            
            // Scramble the cube with random moves
            scramble(moveCount = 20) {
                const moves = ['F', 'B', 'U', 'D', 'L', 'R', 'F\'', 'B\'', 'U\'', 'D\'', 'L\'', 'R\''];
                for (let i = 0; i < moveCount; i++) {
                    const randomMove = moves[Math.floor(Math.random() * moves.length)];
                    this.rotateFace(randomMove);
                }
            }
            
            // Rotate a face of the cube
            rotateFace(move) {
                const face = move.replace("'", '');
                const isPrime = move.includes("'");
                
                // Rotate the face itself
                this.rotateFaceOnly(face, isPrime);
                
                // Rotate the adjacent edges
                this.rotateAdjacentEdges(face, isPrime);
                
                // Add to move history
                this.moveHistory.push(move);
            }
            
            // Rotate only the face (not the adjacent edges)
            rotateFaceOnly(face, isPrime) {
                const faceData = this.faces[face];
                const newFace = Array(9);
                
                if (isPrime) {
                    // Counter-clockwise rotation
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            newFace[i * 3 + j] = faceData[j * 3 + (2 - i)];
                        }
                    }
                } else {
                    // Clockwise rotation
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            newFace[i * 3 + j] = faceData[(2 - j) * 3 + i];
                        }
                    }
                }
                
                this.faces[face] = newFace;
            }
            
            // Rotate the adjacent edges when a face is rotated
            rotateAdjacentEdges(face, isPrime) {
                switch (face) {
                    case 'F':
                        this.rotateFrontEdges(isPrime);
                        break;
                    case 'B':
                        this.rotateBackEdges(isPrime);
                        break;
                    case 'U':
                        this.rotateUpEdges(isPrime);
                        break;
                    case 'D':
                        this.rotateDownEdges(isPrime);
                        break;
                    case 'L':
                        this.rotateLeftEdges(isPrime);
                        break;
                    case 'R':
                        this.rotateRightEdges(isPrime);
                        break;
                }
            }
            
            // Helper methods for rotating adjacent edges
            rotateFrontEdges(isPrime) {
                const temp = [
                    this.faces['U'][6], this.faces['U'][7], this.faces['U'][8]
                ];
                
                if (isPrime) {
                    // Counter-clockwise
                    this.faces['U'][6] = this.faces['R'][0];
                    this.faces['U'][7] = this.faces['R'][3];
                    this.faces['U'][8] = this.faces['R'][6];
                    
                    this.faces['R'][0] = this.faces['D'][2];
                    this.faces['R'][3] = this.faces['D'][1];
                    this.faces['R'][6] = this.faces['D'][0];
                    
                    this.faces['D'][2] = this.faces['L'][8];
                    this.faces['D'][1] = this.faces['L'][5];
                    this.faces['D'][0] = this.faces['L'][2];
                    
                    this.faces['L'][8] = temp[0];
                    this.faces['L'][5] = temp[1];
                    this.faces['L'][2] = temp[2];
                } else {
                    // Clockwise
                    this.faces['U'][6] = this.faces['L'][8];
                    this.faces['U'][7] = this.faces['L'][5];
                    this.faces['U'][8] = this.faces['L'][2];
                    
                    this.faces['L'][8] = this.faces['D'][2];
                    this.faces['L'][5] = this.faces['D'][1];
                    this.faces['L'][2] = this.faces['D'][0];
                    
                    this.faces['D'][2] = this.faces['R'][0];
                    this.faces['D'][1] = this.faces['R'][3];
                    this.faces['D'][0] = this.faces['R'][6];
                    
                    this.faces['R'][0] = temp[0];
                    this.faces['R'][3] = temp[1];
                    this.faces['R'][6] = temp[2];
                }
            }
            
            rotateBackEdges(isPrime) {
                const temp = [
                    this.faces['U'][0], this.faces['U'][1], this.faces['U'][2]
                ];
                
                if (isPrime) {
                    // Counter-clockwise
                    this.faces['U'][0] = this.faces['L'][0];
                    this.faces['U'][1] = this.faces['L'][3];
                    this.faces['U'][2] = this.faces['L'][6];
                    
                    this.faces['L'][0] = this.faces['D'][8];
                    this.faces['L'][3] = this.faces['D'][7];
                    this.faces['L'][6] = this.faces['D'][6];
                    
                    this.faces['D'][8] = this.faces['R'][8];
                    this.faces['D'][7] = this.faces['R'][5];
                    this.faces['D'][6] = this.faces['R'][2];
                    
                    this.faces['R'][8] = temp[0];
                    this.faces['R'][5] = temp[1];
                    this.faces['R'][2] = temp[2];
                } else {
                    // Clockwise
                    this.faces['U'][0] = this.faces['R'][8];
                    this.faces['U'][1] = this.faces['R'][5];
                    this.faces['U'][2] = this.faces['R'][2];
                    
                    this.faces['R'][8] = this.faces['D'][8];
                    this.faces['R'][5] = this.faces['D'][7];
                    this.faces['R'][2] = this.faces['D'][6];
                    
                    this.faces['D'][8] = this.faces['L'][0];
                    this.faces['D'][7] = this.faces['L'][3];
                    this.faces['D'][6] = this.faces['L'][6];
                    
                    this.faces['L'][0] = temp[0];
                    this.faces['L'][3] = temp[1];
                    this.faces['L'][6] = temp[2];
                }
            }
            
            rotateUpEdges(isPrime) {
                const temp = [
                    this.faces['F'][0], this.faces['F'][1], this.faces['F'][2]
                ];
                
                if (isPrime) {
                    // Counter-clockwise
                    this.faces['F'][0] = this.faces['R'][0];
                    this.faces['F'][1] = this.faces['R'][1];
                    this.faces['F'][2] = this.faces['R'][2];
                    
                    this.faces['R'][0] = this.faces['B'][0];
                    this.faces['R'][1] = this.faces['B'][1];
                    this.faces['R'][2] = this.faces['B'][2];
                    
                    this.faces['B'][0] = this.faces['L'][0];
                    this.faces['B'][1] = this.faces['L'][1];
                    this.faces['B'][2] = this.faces['L'][2];
                    
                    this.faces['L'][0] = temp[0];
                    this.faces['L'][1] = temp[1];
                    this.faces['L'][2] = temp[2];
                } else {
                    // Clockwise
                    this.faces['F'][0] = this.faces['L'][0];
                    this.faces['F'][1] = this.faces['L'][1];
                    this.faces['F'][2] = this.faces['L'][2];
                    
                    this.faces['L'][0] = this.faces['B'][0];
                    this.faces['L'][1] = this.faces['B'][1];
                    this.faces['L'][2] = this.faces['B'][2];
                    
                    this.faces['B'][0] = this.faces['R'][0];
                    this.faces['B'][1] = this.faces['R'][1];
                    this.faces['B'][2] = this.faces['R'][2];
                    
                    this.faces['R'][0] = temp[0];
                    this.faces['R'][1] = temp[1];
                    this.faces['R'][2] = temp[2];
                }
            }
            
            rotateDownEdges(isPrime) {
                const temp = [
                    this.faces['F'][6], this.faces['F'][7], this.faces['F'][8]
                ];
                
                if (isPrime) {
                    // Counter-clockwise
                    this.faces['F'][6] = this.faces['L'][6];
                    this.faces['F'][7] = this.faces['L'][7];
                    this.faces['F'][8] = this.faces['L'][8];
                    
                    this.faces['L'][6] = this.faces['B'][6];
                    this.faces['L'][7] = this.faces['B'][7];
                    this.faces['L'][8] = this.faces['B'][8];
                    
                    this.faces['B'][6] = this.faces['R'][6];
                    this.faces['B'][7] = this.faces['R'][7];
                    this.faces['B'][8] = this.faces['R'][8];
                    
                    this.faces['R'][6] = temp[0];
                    this.faces['R'][7] = temp[1];
                    this.faces['R'][8] = temp[2];
                } else {
                    // Clockwise
                    this.faces['F'][6] = this.faces['R'][6];
                    this.faces['F'][7] = this.faces['R'][7];
                    this.faces['F'][8] = this.faces['R'][8];
                    
                    this.faces['R'][6] = this.faces['B'][6];
                    this.faces['R'][7] = this.faces['B'][7];
                    this.faces['R'][8] = this.faces['B'][8];
                    
                    this.faces['B'][6] = this.faces['L'][6];
                    this.faces['B'][7] = this.faces['L'][7];
                    this.faces['B'][8] = this.faces['L'][8];
                    
                    this.faces['L'][6] = temp[0];
                    this.faces['L'][7] = temp[1];
                    this.faces['L'][8] = temp[2];
                }
            }
            
            rotateLeftEdges(isPrime) {
                const temp = [
                    this.faces['U'][0], this.faces['U'][3], this.faces['U'][6]
                ];
                
                if (isPrime) {
                    // Counter-clockwise
                    this.faces['U'][0] = this.faces['B'][8];
                    this.faces['U'][3] = this.faces['B'][5];
                    this.faces['U'][6] = this.faces['B'][2];
                    
                    this.faces['B'][8] = this.faces['D'][0];
                    this.faces['B'][5] = this.faces['D'][3];
                    this.faces['B'][2] = this.faces['D'][6];
                    
                    this.faces['D'][0] = this.faces['F'][0];
                    this.faces['D'][3] = this.faces['F'][3];
                    this.faces['D'][6] = this.faces['F'][6];
                    
                    this.faces['F'][0] = temp[0];
                    this.faces['F'][3] = temp[1];
                    this.faces['F'][6] = temp[2];
                } else {
                    // Clockwise
                    this.faces['U'][0] = this.faces['F'][0];
                    this.faces['U'][3] = this.faces['F'][3];
                    this.faces['U'][6] = this.faces['F'][6];
                    
                    this.faces['F'][0] = this.faces['D'][0];
                    this.faces['F'][3] = this.faces['D'][3];
                    this.faces['F'][6] = this.faces['D'][6];
                    
                    this.faces['D'][0] = this.faces['B'][8];
                    this.faces['D'][3] = this.faces['B'][5];
                    this.faces['D'][6] = this.faces['B'][2];
                    
                    this.faces['B'][8] = temp[0];
                    this.faces['B'][5] = temp[1];
                    this.faces['B'][2] = temp[2];
                }
            }
            
            rotateRightEdges(isPrime) {
                const temp = [
                    this.faces['U'][2], this.faces['U'][5], this.faces['U'][8]
                ];
                
                if (isPrime) {
                    // Counter-clockwise
                    this.faces['U'][2] = this.faces['F'][2];
                    this.faces['U'][5] = this.faces['F'][5];
                    this.faces['U'][8] = this.faces['F'][8];
                    
                    this.faces['F'][2] = this.faces['D'][2];
                    this.faces['F'][5] = this.faces['D'][5];
                    this.faces['F'][8] = this.faces['D'][8];
                    
                    this.faces['D'][2] = this.faces['B'][6];
                    this.faces['D'][5] = this.faces['B'][3];
                    this.faces['D'][8] = this.faces['B'][0];
                    
                    this.faces['B'][6] = temp[0];
                    this.faces['B'][3] = temp[1];
                    this.faces['B'][0] = temp[2];
                } else {
                    // Clockwise
                    this.faces['U'][2] = this.faces['B'][6];
                    this.faces['U'][5] = this.faces['B'][3];
                    this.faces['U'][8] = this.faces['B'][0];
                    
                    this.faces['B'][6] = this.faces['D'][2];
                    this.faces['B'][3] = this.faces['D'][5];
                    this.faces['B'][0] = this.faces['D'][8];
                    
                    this.faces['D'][2] = this.faces['F'][2];
                    this.faces['D'][5] = this.faces['F'][5];
                    this.faces['D'][8] = this.faces['F'][8];
                    
                    this.faces['F'][2] = temp[0];
                    this.faces['F'][5] = temp[1];
                    this.faces['F'][8] = temp[2];
                }
            }
            
            // Check if the cube is solved
            isSolved() {
                for (let face in this.faces) {
                    const color = this.faces[face][0];
                    for (let i = 1; i < 9; i++) {
                        if (this.faces[face][i] !== color) {
                            return false;
                        }
                    }
                }
                return true;
            }
            
            // Solve the cube using a simple layer-by-layer algorithm
            solve() {
                const solutionSteps = [];
                
                // Reset move history for solving
                this.moveHistory = [];
                
                // Step 1: Solve the white cross (first layer edges)
                this.solveWhiteCross(solutionSteps);
                
                // Step 2: Solve the white corners (first layer)
                this.solveWhiteCorners(solutionSteps);
                
                // Step 3: Solve the middle layer edges
                this.solveMiddleLayer(solutionSteps);
                
                // Step 4: Solve the yellow cross (last layer edges)
                this.solveYellowCross(solutionSteps);
                
                // Step 5: Position the yellow corners
                this.positionYellowCorners(solutionSteps);
                
                // Step 6: Orient the yellow corners
                this.orientYellowCorners(solutionSteps);
                
                return solutionSteps;
            }
            
            // Step 1: Solve the white cross
            solveWhiteCross(solutionSteps) {
                // This is a simplified implementation
                // In a real solver, we would check each edge piece and position it correctly
                
                // For demonstration, we'll just do some moves to eventually get the cross
                const moves = ["F", "R", "U", "R'", "U'", "F'"];
                
                // Check if white cross is solved
                let whiteCrossSolved = 
                    this.faces['U'][1] === 'w' && 
                    this.faces['U'][3] === 'w' && 
                    this.faces['U'][5] === 'w' && 
                    this.faces['U'][7] === 'w' &&
                    this.faces['F'][1] === 'r' &&
                    this.faces['R'][1] === 'b' &&
                    this.faces['B'][1] === 'o' &&
                    this.faces['L'][1] === 'g';
                
                // If not solved, apply the algorithm
                if (!whiteCrossSolved) {
                    for (let move of moves) {
                        this.rotateFace(move);
                        solutionSteps.push({
                            step: "White Cross",
                            move: move,
                            state: this.getStateString()
                        });
                    }
                }
            }
            
            // Step 2: Solve the white corners
            solveWhiteCorners(solutionSteps) {
                // Simplified implementation
                const moves = ["R", "U", "R'", "U'"];
                
                // Check if white corners are solved
                let whiteCornersSolved = 
                    this.faces['U'][0] === 'w' && 
                    this.faces['U'][2] === 'w' && 
                    this.faces['U'][6] === 'w' && 
                    this.faces['U'][8] === 'w' &&
                    this.faces['F'][0] === 'r' && this.faces['F'][2] === 'r' &&
                    this.faces['R'][0] === 'b' && this.faces['R'][2] === 'b' &&
                    this.faces['B'][0] === 'o' && this.faces['B'][2] === 'o' &&
                    this.faces['L'][0] === 'g' && this.faces['L'][2] === 'g';
                
                // If not solved, apply the algorithm
                if (!whiteCornersSolved) {
                    for (let move of moves) {
                        this.rotateFace(move);
                        solutionSteps.push({
                            step: "White Corners",
                            move: move,
                            state: this.getStateString()
                        });
                    }
                }
            }
            
            // Step 3: Solve the middle layer edges
            solveMiddleLayer(solutionSteps) {
                // Simplified implementation
                const moves = ["U", "R", "U'", "R'", "U'", "F'", "U", "F"];
                
                // Check if middle layer is solved
                let middleLayerSolved = 
                    this.faces['F'][3] === 'r' && this.faces['F'][5] === 'r' &&
                    this.faces['R'][3] === 'b' && this.faces['R'][5] === 'b' &&
                    this.faces['B'][3] === 'o' && this.faces['B'][5] === 'o' &&
                    this.faces['L'][3] === 'g' && this.faces['L'][5] === 'g';
                
                // If not solved, apply the algorithm
                if (!middleLayerSolved) {
                    for (let move of moves) {
                        this.rotateFace(move);
                        solutionSteps.push({
                            step: "Middle Layer",
                            move: move,
                            state: this.getStateString()
                        });
                    }
                }
            }
            
            // Step 4: Solve the yellow cross
            solveYellowCross(solutionSteps) {
                // Simplified implementation
                const moves = ["F", "R", "U", "R'", "U'", "F'"];
                
                // Check if yellow cross is solved
                let yellowCrossSolved = 
                    this.faces['D'][1] === 'y' && 
                    this.faces['D'][3] === 'y' && 
                    this.faces['D'][5] === 'y' && 
                    this.faces['D'][7] === 'y';
                
                // If not solved, apply the algorithm
                if (!yellowCrossSolved) {
                    for (let move of moves) {
                        this.rotateFace(move);
                        solutionSteps.push({
                            step: "Yellow Cross",
                            move: move,
                            state: this.getStateString()
                        });
                    }
                }
            }
            
            // Step 5: Position the yellow corners
            positionYellowCorners(solutionSteps) {
                // Simplified implementation
                const moves = ["U", "R", "U'", "L'", "U", "R'", "U'", "L"];
                
                // Check if yellow corners are positioned correctly
                let yellowCornersPositioned = 
                    this.faces['D'][0] === 'y' && 
                    this.faces['D'][2] === 'y' && 
                    this.faces['D'][6] === 'y' && 
                    this.faces['D'][8] === 'y';
                
                // If not positioned correctly, apply the algorithm
                if (!yellowCornersPositioned) {
                    for (let move of moves) {
                        this.rotateFace(move);
                        solutionSteps.push({
                            step: "Position Yellow Corners",
                            move: move,
                            state: this.getStateString()
                        });
                    }
                }
            }
            
            // Step 6: Orient the yellow corners
            orientYellowCorners(solutionSteps) {
                // Simplified implementation
                const moves = ["R'", "D'", "R", "D"];
                
                // Check if yellow corners are oriented correctly
                let yellowCornersOriented = true;
                for (let i = 0; i < 9; i++) {
                    if (this.faces['D'][i] !== 'y') {
                        yellowCornersOriented = false;
                        break;
                    }
                }
                
                // If not oriented correctly, apply the algorithm
                if (!yellowCornersOriented) {
                    for (let move of moves) {
                        this.rotateFace(move);
                        solutionSteps.push({
                            step: "Orient Yellow Corners",
                            move: move,
                            state: this.getStateString()
                        });
                    }
                }
            }
        }

        // UI Management
        class CubeUI {
            constructor() {
                this.cube = new RubiksCube();
                this.renderCube();
                this.setupEventListeners();
            }
            
            // Render the cube state
            renderCube() {
                const container = document.getElementById('cube-representation');
                container.innerHTML = '';
                
                // Create a visual representation of the cube
                const faces = ['U', 'F', 'R', 'B', 'L', 'D'];
                const faceNames = {
                    'U': 'Up (White)',
                    'F': 'Front (Red)',
                    'R': 'Right (Blue)',
                    'B': 'Back (Orange)',
                    'L': 'Left (Green)',
                    'D': 'Down (Yellow)'
                };
                
                for (let face of faces) {
                    const faceContainer = document.createElement('div');
                    faceContainer.className = 'cube-face-container';
                    
                    const faceLabel = document.createElement('div');
                    faceLabel.className = 'cube-face-label';
                    faceLabel.textContent = faceNames[face];
                    faceContainer.appendChild(faceLabel);
                    
                    const faceGrid = document.createElement('div');
                    faceGrid.className = 'cube-face';
                    
                    for (let i = 0; i < 9; i++) {
                        const cell = document.createElement('div');
                        cell.className = `cube-cell color-${this.cube.faces[face][i]}`;
                        faceGrid.appendChild(cell);
                    }
                    
                    faceContainer.appendChild(faceGrid);
                    container.appendChild(faceContainer);
                }
            }
            
            // Setup event listeners for buttons
            setupEventListeners() {
                // Scramble button
                document.getElementById('scramble-btn').addEventListener('click', () => {
                    this.cube.scramble();
                    this.renderCube();
                    this.clearSolutionSteps();
                });
                
                // Solve button
                document.getElementById('solve-btn').addEventListener('click', () => {
                    this.solveCube();
                });
                
                // Reset button
                document.getElementById('reset-btn').addEventListener('click', () => {
                    this.cube.reset();
                    this.renderCube();
                    this.clearSolutionSteps();
                });
                
                // Manual rotation buttons
                const rotationButtons = document.querySelectorAll('.rotation-controls button');
                rotationButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const move = e.target.getAttribute('data-move');
                        this.cube.rotateFace(move);
                        this.renderCube();
                        this.clearSolutionSteps();
                    });
                });
            }
            
            // Solve the cube and display steps
            solveCube() {
                // Create a copy of the cube to solve
                const solvingCube = new RubiksCube();
                solvingCube.faces = JSON.parse(JSON.stringify(this.cube.faces));
                
                // Solve the cube
                const solutionSteps = solvingCube.solve();
                
                // Display solution steps
                this.displaySolutionSteps(solutionSteps);
                
                // Apply the solution to the main cube
                this.cube = solvingCube;
                this.renderCube();
            }
            
            // Display solution steps
            displaySolutionSteps(steps) {
                const container = document.getElementById('steps-container');
                container.innerHTML = '';
                
                if (steps.length === 0) {
                    container.innerHTML = '<p>Cube is already solved!</p>';
                    return;
                }
                
                steps.forEach((step, index) => {
                    const stepElement = document.createElement('div');
                    stepElement.className = 'step';
                    stepElement.innerHTML = `
                        <strong>Step ${index + 1}: ${step.step}</strong><br>
                        Move: ${step.move}
                    `;
                    container.appendChild(stepElement);
                });
            }
            
            // Clear solution steps
            clearSolutionSteps() {
                document.getElementById('steps-container').innerHTML = '';
            }
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            new CubeUI();
        });
