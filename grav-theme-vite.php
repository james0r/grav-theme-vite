<?php

namespace Grav\Theme;

use Exception;
use Grav\Common\Theme;

class GravThemeVite extends Theme {

  /**
   * Flag to determine whether hot server is active.
   * Calculated when Vite::initialise() is called.
   *
   * @var bool
   */
  private static bool $isHot = false;

  /**
   * The URI to the hot server. Calculated when
   * Vite::initialise() is called.
   *
   * @var string
   */
  private static string $server;

  /**
   * The path where compiled assets will go.
   *
   * @var string
   */
  private static string $buildPath = 'build';

  /**
   * Manifest file contents. Initialised
   * when Vite::initialise() is called.
   *
   * @var array
   */
  private static array $manifest = [];

  public static function getSubscribedEvents(): array {
    return [
      'onThemeInitialized' => ['onThemeInitialized', 0],
    ];
  }

  /**
   * Initialize the plugin
   */
  public function onThemeInitialized(): void {
    // Don't proceed if we are in the admin plugin
    if ($this->isAdmin()) {
      return;
    }

    // dd($this->grav['assets']);

    // Enable the main events we are interested in
    $this->enable(
      [
        'onAssetsInitialized' => ['initVite', 2000],
      ]
    );
  }

  public function initVite(): void {
    static::$isHot = file_exists(static::hotFilePath());

    // are we running hot?
    if (static::$isHot) {
      static::$server = file_get_contents(static::hotFilePath());
      $client = static::$server . '/@vite/client';

      $this->grav['assets']->addJsModule($client, 101);

      // Load our entry script
      $filename = $this->viteAsset('src/theme.js');
      $this->grav['assets']->addJsModule($filename, 101);

      // Load our entry styles
      $filename = $this->viteAsset('src/theme.css');
      $this->grav['assets']->addCss($filename, 101);
    } else {
      // we must have a manifest file...
      if (!file_exists($manifestPath = static::buildPath() . '/manifest.json')) {
        throw new Exception('No Vite Manifest exists. Should hot server be running?');
      }

      // store our manifest contents.
      static::$manifest = json_decode(file_get_contents($manifestPath), true);

      // Load our entry script
      $filename = $this->viteAsset('src/theme.js');
      $this->grav['assets']->addJs('theme://' . $filename, ['loading' => 'defer', 'priority' => 101]);

      // Load our entry styles
      $filename = $this->viteAsset('src/theme.css');
      $this->grav['assets']->addCss('theme://' . $filename, 101);
    }
  }

  /**
   * Return URI path to an asset.
   *
   * @param $asset
   *
   * @return string
   * @throws Exception
   */
  public function viteAsset($asset, bool $enqueueCss = true): string {
    if (static::$isHot) {
      return static::$server . '/' . ltrim($asset, '/');
    }

    if (!array_key_exists($asset, static::$manifest)) {
      throw new Exception('Unknown Vite build asset: ' . $asset);
    }

    // If we're not hot, load css sub modules
    if (!static::$isHot) {
      static::enqueueSubModules($asset);
    }

    return implode('/', [static::$buildPath, static::$manifest[$asset]['file']]);
  }

  /**
   * Enqueue the sub assets for an asset.
   *
   * @param $asset
   *
   * @return void
   */

  public function enqueueSubModules($asset): void {
    // If we're not hot, enqueue asset css dependencies
    if (array_key_exists('css', static::$manifest[$asset])) {
      foreach (static::$manifest[$asset]['css'] as $cssAsset) {
        $path = implode('/', [static::$buildPath, $cssAsset]);
        $this->grav['assets']->addCss('theme://' . $path, 100);
      }
    }
  }

  /**
   * Internal method to determine hotFilePath.
   *
   * @return string
   */
  private static function hotFilePath(): string {
    return implode('/', [static::buildPath(), 'hot']);
  }

  /**
   * Internal method to determine buildPath.
   *
   * @return string
   */
  private static function buildPath(): string {
    return implode('/', [__DIR__, static::$buildPath]);
  }
}
