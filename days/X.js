// Made by Mariana Marangoni (keep this line and replace with your name)

let letter;
let myTexture;
let font, pg, bg, btn;
let generatedLetter0;
let generatedLetter1;
let generatedLetter2;
let generatedLetter3;
let myGeometry;

function dayXPreload() {
  font = loadFont("../assets/dayX/Austie.ttf");
  myTexture = loadImage("../assets/dayX/paper.png");
  santaStamp = loadImage("../assets/dayX/stamp2.png");
  stamp = loadImage("../assets/dayX/ministamp.png");
  satanStamp = loadImage("../assets/dayX/satanstamp.png");

  // Load any assets here (with assets.dayX at the front of the variable name)
}

class DayX extends Day {

  constructor() {

    super();
    this.loop = true; // Set to true or false

    this.controls = "Press SPACEBAR to (re)generate a letter"; // Write any controls for interactivity if needed or leave blank
    this.credits = "Made by Mariana Marangoni"; // Replace with your name

    // Define variables here. Runs once during the sketch holder setup
  }

  prerun() {
    // Initialise/reset variables here. Runs once, every time your day is viewed

    createCanvas(700, 700, WEBGL);
    textureMode(NORMAL);
    bg = createGraphics(700, 700);

    let detailX = 20;
    let detailY = 20;
    myGeometry = new p5.Geometry(detailX, detailY, function () {
      for (let x = 0; x <= detailX; x++) {
        for (let y = 0; y <= detailY; y++) {
          this.vertices.push(
            new p5.Vector(
              x / detailX,
              y / detailY,
              (sin((x / detailX) * PI) + cos((y / detailY) * PI)) / 10
            )
          );
          this.uvs.push([x / detailX, y / detailY]);
        }
      }

      this.computeFaces();
      this.computeNormals();
    });
    this.generateLetter();


    // Set texture to the geometry
    myGeometry.texture = myTexture;
    letter = createGraphics(400, 400);
    letter.textFont(font);
    letter.textLeading(40);
    letter.textSize(42);
    letter.background(myTexture);
    letter.image(santaStamp, 180, 10);
    letter.image(stamp, 220, 30);
    letter.fill(50);
    letter.text(generatedLetter0, 20, 120, 380);
    letter.text(generatedLetter1, 20, 160, 380);
    letter.text(generatedLetter2, 20, 200, 380);
    letter.text(generatedLetter3, 20, 300, 380);
    if (generatedLetter0 == "Dear Satan,") {
      letter.image(satanStamp, 180, 10);
    } 
    describe("a kid letter to Santa");
  }
  generateLetter() {
    let greetSentences = [
      "Dear Santa,",
      "Dear Satan,",
      "Dear Santa,",
      "Dear Santa,",
      "Dear Santa,",
      "Dear Santa,",
      "Dear Santa,",
      "Dear Santa,"
    ];
    let introSentences = [
      "I hope this letter finds you well.",
      "How are you doing?",
      "How are the reindeer doing?",
      "Are you real?? I think you are!",
      "I can't believe it's almost Christmas!",
      "I'll leave cookies and milk for you.",
      "Please say hi to Rudolph for me!"
    ];

    let wishSentences = [
      "I wish for a robot with laser eyes!",
      "My biggest dream is to have a puppy.",
      "Could you please bring me a book about space pirates?",
      "Can I have a fluffy teddy bear to keep me company at night?"
    ];


    let nameOptions = [
      "Tommy",
      "Samantha",
      "Alex",
      "Emily",
      "Charlie",
      "Mary",
      "Stella",
      "Lucy",
      "Melissa",
      "Jimmy",
      "Mark"
    ];
    let greet = random(greetSentences);
    let intro = random(introSentences);
    let wish = random(wishSentences);
    let name = random(nameOptions);
    generatedLetter0 = `${greet}`;
    generatedLetter1 = `${intro}`;
    generatedLetter2 = `${wish} `;
    generatedLetter3 = `Sincerely, \n${name}`;
  }


  update() {
    background(170, 50, 50);
    noStroke();
    push();
    orbitControl();
    let paperSize = width / 1.5;
   // rotateY((cos(millis() / 10000) * PI) / 8);
    translate(-paperSize / 2, -paperSize / 2);
    scale(paperSize);
    texture(letter);
    beginShape(TRIANGLES);
    for (let i = 0; i < myGeometry.faces.length; i++) {
      let face = myGeometry.faces[i];
      for (let j = 0; j < face.length; j++) {
        let vert = myGeometry.vertices[face[j]];
        let uv = myGeometry.uvs[face[j]];
        vertex(vert.x, vert.y, vert.z, uv[0], uv[1]);
      }
    }
    endShape(CLOSE);
    pop();
  }
  keyPressed() {
    if (key === ' ') {
this.prerun()    
} else if (key === 's') {
  save("letter.png"); }
  }
  
}