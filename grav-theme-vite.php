<?php
namespace Grav\Theme;

use Grav\Common\Theme;

class GravThemeVite extends Theme
{
  public static function getSubscribedEvents(): array {
    return [
      'onPluginsInitialized' => ['onPluginsInitialized', 0],
    ];
  }

  /**
   * Initialize the plugin
   */
  public function onPluginsInitialized(): void {
    // Don't proceed if we are in the admin plugin
    if ($this->isAdmin()) {
      return;
    }

    // Enable the main events we are interested in
    $this->enable(
      [
        'onTwigTemplatePaths' => ['onTwigTemplatePaths', 1000],
      ]
    );
  }
}
