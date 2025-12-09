const express = require("express");
const mongoose = require("mongoose");
const { monitorEventLoopDelay } = require("perf_hooks");

const h = monitorEventLoopDelay({ resolution: 10 });
h.enable(); // start measuring

const serverHealth = async (req, res) => {
  const serverUptime = process.uptime();
  const memory = process.memoryUsage();
  const eventLoopLag = h.mean / 1e6; // ns → ms

  let mongoStatus = "unknown";

  try {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    mongoStatus = states[mongoose.connection.readyState] || "unknown";
  } catch {
    mongoStatus = "error";
  }

  res.json({
    express: {
      status: "ok",
      uptime: Math.round(serverUptime),
      memoryMB: Math.round(memory.rss / 1024 / 1024),
      eventLoopLagMS: eventLoopLag.toFixed(2),
    },
    mongodb: mongoStatus,
    timestamp: new Date().toISOString(),
  });
};

module.exports = serverHealth;
