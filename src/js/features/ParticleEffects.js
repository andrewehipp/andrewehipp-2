const Particle = function (width, height, index, count) {
    const numberInSeries = (index + 1) / count;

    this.canvasWidth = width;
    this.canvasHeight = height;

    this.x = ((width * index) / count) - 200;
    this.y = -(height * 0.5);

    this.dx = (Math.random() - 0.5) * 0.2;
    this.dy = (Math.random() - 0.5) * 0.2;

    this.size = Math.max(height * 2, 300);
    this.rotate = (360 * numberInSeries) * Math.random();
};

Particle.prototype.update = function () {
    this.x = this.x + this.dx;
    // this.y = this.y + this.dy;

    this.rotate = this.rotate + 0.01;

    if (this.x > this.canvasWidth + this.size) {
        this.x = -this.size;
    }

    if (this.x < -this.size) {
        this.x = this.canvasWidth + this.size;
    }

    if (this.y > this.canvasHeight + this.size) {
        this.y = -this.size;
    }

    if (this.y < -this.size) {
        this.y = this.canvasHeight + this.size;
    }
};

Particle.prototype.draw = function (ctx) {
    const halfSize = this.size / 2;

    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x + halfSize, this.y + halfSize);
    ctx.rotate(this.rotate * (Math.PI / 180));
    ctx.translate(-halfSize, -halfSize);

    ctx.moveTo(0, 0);
    ctx.lineTo(this.size, 0);
    ctx.lineTo(this.size, this.size);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};


const ParticleEffect = function (selector) {
    this.canvas = document.querySelector(selector);

    this.particles = [];
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;

    this.count = 15;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx.fillStyle = '#fff';
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#fff';
    this.ctx.globalAlpha = (Math.random() * 0.2) + 0.1;

    for (let i = 0; i < this.count; i += 1) {
        this.particles.push(new Particle(this.width, this.height, i, this.count));
    }
};

ParticleEffect.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.particles.forEach((particle) => {
        particle.draw(this.ctx);
    });
};

ParticleEffect.prototype.update = function () {
    this.particles.forEach((particle) => {
        particle.update();
    });
};

ParticleEffect.prototype.loop = function () {
    this.draw();
    this.update();

    window.requestAnimationFrame(this.loop.bind(this));
};

ParticleEffect.prototype.init = function () {
    this.loop();
};


export default ParticleEffect;
